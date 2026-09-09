const endpoint = "https://lonkingsanh365.infinityfreeapp.com/graphql";

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

async function fetchSchema() {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    const json = await res.json();
    const fields = json.data.__type.fields;
    const seoField = fields.find(f => f.name === 'seo');
    
    if (seoField) {
      console.log("✅ 'seo' field EXISTS on Post type!");
      console.log(JSON.stringify(seoField, null, 2));
      
      // Let's also fetch the fields of the SEO type
      const seoTypeName = seoField.type.name || (seoField.type.ofType && seoField.type.ofType.name) || "PostToSEOConnection"; // depending on how WPGraphQL exposes it
      
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
      const res2 = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: typeQuery })
      });
      const json2 = await res2.json();
      console.log("SEO Fields:", JSON.stringify(json2.data.__type?.fields?.map(f => f.name), null, 2));

    } else {
      console.log("❌ 'seo' field DOES NOT exist on Post type.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchSchema();
