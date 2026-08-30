import { chromium } from "playwright";

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;
const GRAPHQL_ENDPOINT = process.env.WORDPRESS_GRAPHQL_ENDPOINT;
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!WP_URL || !GRAPHQL_ENDPOINT || !REDIS_URL || !REDIS_TOKEN) {
  console.error("❌ Thiếu biến môi trường (NEXT_PUBLIC_WORDPRESS_URL, WORDPRESS_GRAPHQL_ENDPOINT, UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN)");
  process.exit(1);
}

const QUERIES = {
  wp_hero_banners_cache: `
    query GetHeroBanners {
      pages(where: { title: "Website Settings" }) {
        nodes {
          websiteSettings {
            heroTitle
            heroDescription
            heroBackground { node { sourceUrl } }
            heroBackground2 { node { sourceUrl } }
            heroBackground3 { node { sourceUrl } }
          }
        }
      }
    }
  `,
  wp_posts_cache: `
    query GetPosts {
      posts(first: 100) {
        nodes {
          title
          slug
          excerpt
          content
          date
          featuredImage { node { sourceUrl } }
          categories { nodes { name slug } }
          blogFields {
            readTime
            isFeatured
            authorName
            authorRole
            authorAvatar { node { sourceUrl } }
          }
        }
      }
    }
  `,
  wp_categories_cache: `
    query GetCategories {
      categories(first: 100, where: { hideEmpty: false }) {
        nodes {
          name
          slug
          count
        }
      }
    }
  `,
  wp_products_cache: `
    query Products {
      products(first: 100) {
        nodes {
          id
          title
          slug
          content
          productCategories { nodes { name slug } }
          featuredImage { node { sourceUrl } }
          productFields {
            model
            engine
            bucketCapacity
            operatingWeight
            ratedPower
            liftingCapacity
            ironingCapacity
            loIPin
            powerType
            shortDescription
            dischargeHeight
            isNew
            isFeatured
            productGallery { node { sourceUrl } }
            nh2 { node { sourceUrl } }
            nh3 { node { sourceUrl } }
          }
        }
      }
    }
  `,
  wp_product_categories_cache: `
    query GetProductCategories {
      productCategories(first: 100) {
        nodes {
          name
          slug
          productCategoryFields {
            categoryImage { node { sourceUrl } }
          }
        }
      }
    }
  `
};

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 5000;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(page, query, variables = {}) {
  let attempt = 1;
  while (attempt <= MAX_RETRIES) {
    try {
      const result = await page.evaluate(
        async ({ endpoint, query, variables }) => {
          const res = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "same-origin", // To send cookies like __test
            body: JSON.stringify({ query, variables }),
          });

          if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status}`);
          }

          return await res.json();
        },
        { endpoint: GRAPHQL_ENDPOINT, query, variables }
      );

      if (result.errors) {
        throw new Error(`GraphQL Errors: ${JSON.stringify(result.errors)}`);
      }

      return result.data;
    } catch (error) {
      console.warn(`⚠️ [Attempt ${attempt}/${MAX_RETRIES}] Lỗi khi fetch GraphQL:`, error.message);
      if (attempt === MAX_RETRIES) {
        throw error; // Throw ở lần cuối cùng để log ra ngoài
      }
      await sleep(RETRY_DELAY_MS);
      attempt++;
    }
  }
}

async function saveToUpstash(key, data) {
  let attempt = 1;
  while (attempt <= MAX_RETRIES) {
    try {
      const payload = JSON.stringify(data); // redis value must be string
      const res = await fetch(`${REDIS_URL}/set/${key}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${REDIS_TOKEN}`,
        },
        body: payload
      });

      if (!res.ok) {
        throw new Error(`Upstash HTTP Error: ${res.status}`);
      }

      const result = await res.json();
      if (result.error) {
        throw new Error(`Upstash Error: ${result.error}`);
      }

      console.log(`✅ Lưu thành công key: ${key}`);
      return;
    } catch (error) {
      console.warn(`⚠️ [Attempt ${attempt}/${MAX_RETRIES}] Lỗi khi lưu vào Upstash (key: ${key}):`, error.message);
      if (attempt === MAX_RETRIES) {
        throw error;
      }
      await sleep(RETRY_DELAY_MS);
      attempt++;
    }
  }
}

async function main() {
  console.log("🚀 Bắt đầu khởi chạy Playwright...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log(`🌐 Đang mở trang ${WP_URL} để nhận cookie chống bot...`);
    // Chờ domcontentloaded để chắc chắn script aes.js đã chạy và set cookie __test
    await page.goto(WP_URL, { waitUntil: "domcontentloaded", timeout: 30000 });

    // Đợi thêm 2 giây để chắc chắn challenge JS đã hoàn thành nếu có redirect nội bộ
    await page.waitForTimeout(2000);

    const cookies = await context.cookies();
    console.log("🍪 Cookies hiện tại:", cookies.map(c => c.name).join(", "));
    
    // Lưu cookie __test vào Redis để Next.js Proxy dùng tải ảnh tĩnh
    const testCookie = cookies.find(c => c.name === '__test');
    if (testCookie) {
      console.log(`🔑 Đã tìm thấy cookie __test, đang lưu vào Redis...`);
      await saveToUpstash('wp_cookie_cache', testCookie.value);
    }
    
    // Bắt buộc phải lưu đúng User-Agent mà Playwright dùng, 
    // vì InfinityFree khoá cookie __test theo IP và User-Agent.
    const userAgent = await page.evaluate(() => navigator.userAgent);
    await saveToUpstash('wp_user_agent_cache', userAgent);

    console.log("🔄 Bắt đầu lấy dữ liệu từ WPGraphQL...");
    
    for (const [key, query] of Object.entries(QUERIES)) {
      console.log(`\n⏳ Đang fetch data cho: ${key}`);
      const data = await fetchWithRetry(page, query);
      
      // Parse data cho gọn gàng (tránh lưu nguyên object GraphQL cồng kềnh)
      let finalData = data;
      if (key === 'wp_hero_banners_cache') finalData = data.pages;
      else if (key === 'wp_posts_cache') finalData = data.posts;
      else if (key === 'wp_categories_cache') finalData = data.categories;
      else if (key === 'wp_products_cache') finalData = data.products;
      else if (key === 'wp_product_categories_cache') finalData = data.productCategories;

      await saveToUpstash(key, finalData);
    }
    
    console.log("\n🔄 Bắt đầu lấy dữ liệu từ REST API...");
    const REST_ENDPOINTS = {
      wp_lucky_prizes_cache: `${WP_URL}/wp-json/lucky/v1/prizes`
    };
    
    for (const [key, url] of Object.entries(REST_ENDPOINTS)) {
      console.log(`\n⏳ Đang fetch REST data cho: ${key}`);
      let attempt = 1;
      let finalData = null;
      while (attempt <= MAX_RETRIES) {
        try {
          finalData = await page.evaluate(async ({ url }) => {
            const res = await fetch(url, { credentials: "same-origin" });
            if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
            return await res.json();
          }, { url });
          break;
        } catch (error) {
          console.warn(`⚠️ [Attempt ${attempt}/${MAX_RETRIES}] Lỗi khi fetch REST ${url}:`, error.message);
          if (attempt === MAX_RETRIES) throw error;
          await sleep(RETRY_DELAY_MS);
          attempt++;
        }
      }
      await saveToUpstash(key, finalData);
    }
    
    console.log("\n🎉 HOÀN THÀNH: Đã đồng bộ toàn bộ dữ liệu thành công!");
  } catch (error) {
    console.error("\n❌ LỖI NGHIÊM TRỌNG:", error.message);
    process.exit(1);
  } finally {
    console.log("🧹 Đóng trình duyệt.");
    await browser.close();
  }
}

main();
