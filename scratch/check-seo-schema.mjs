import { chromium } from "playwright";

const WP_URL = "https://lonkingsanh365.infinityfreeapp.com";
const GRAPHQL_ENDPOINT = "https://lonkingsanh365.infinityfreeapp.com/graphql";

const query = `
  query GetPostSchema {
    __type(name: "Post") {
      fields {
        name
        type {
          name
          kind
        }
      }
    }
  }
`;

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(WP_URL, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(2000);

    const result = await page.evaluate(
      async ({ endpoint, query }) => {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "same-origin",
          body: JSON.stringify({ query }),
        });
        return await res.json();
      },
      { endpoint: GRAPHQL_ENDPOINT, query }
    );

    const fields = result.data.__type.fields;
    const seoField = fields.find(f => f.name === 'seo');
    
    if (seoField) {
      console.log("✅ 'seo' field EXISTS on Post type!");
      
      const typeQuery = `
        query GetSEOType {
          __type(name: "PostTypeSEO") {
            fields {
              name
              type {
                name
              }
            }
          }
        }
      `;
      const res2 = await page.evaluate(
        async ({ endpoint, query }) => {
          const res = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "same-origin",
            body: JSON.stringify({ query }),
          });
          return await res.json();
        },
        { endpoint: GRAPHQL_ENDPOINT, query: typeQuery }
      );
      
      console.log("SEO Fields:", JSON.stringify(res2.data.__type?.fields?.map(f => f.name), null, 2));

    } else {
      console.log("❌ 'seo' field DOES NOT exist on Post type.");
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await browser.close();
  }
}

main();
