import { chromium } from "playwright";

const WP_URL = "https://lonkingsanh365.infinityfreeapp.com";
const REST_ENDPOINT = "https://lonkingsanh365.infinityfreeapp.com/wp-json/wp/v2/posts?per_page=1";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(WP_URL, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(2000);

    const result = await page.evaluate(
      async ({ endpoint }) => {
        const res = await fetch(endpoint, {
          credentials: "same-origin",
        });
        return await res.json();
      },
      { endpoint: REST_ENDPOINT }
    );

    console.log("REST API Post Data keys:", Object.keys(result[0]));
    
    // Check for rank_math or yoast or seo fields
    const rmFields = Object.keys(result[0]).filter(k => k.includes('rank_math') || k.includes('seo') || k.includes('head'));
    console.log("Rank Math / SEO fields:", rmFields);
    
    rmFields.forEach(field => {
      console.log(`\nField: ${field}\nValue:`, result[0][field]);
    });

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await browser.close();
  }
}

main();
