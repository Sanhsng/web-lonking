const { request, gql } = require('graphql-request');

const query = gql`
  query {
    products(first: 100) {
      nodes {
        title
        slug
        productFields {
          powerType
          loIPin
        }
      }
    }
  }
`;

request('http://localhost/lonking-cms/graphql', query)
  .then((data) => {
    const product = data.products.nodes.find(p => p.slug.includes('6420'));
    console.log("Product:", JSON.stringify(product, null, 2));
    const powerType = product.productFields?.powerType;
    const isElectric = powerType?.some(t => ["electric", "điện", "dien"].includes(t.trim().toLowerCase()));
    console.log("Evaluated isElectric:", isElectric);
  })
  .catch((err) => console.error(err));
