const query = `
  query Products {
    products(where: { search: "D6" }) {
      nodes {
        title
        productFields {
          bucketCapacity
          ironingCapacity
        }
      }
    }
  }
`;
fetch("http://localhost/lonking-cms/graphql", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query }),
})
  .then(res => res.json())
  .then(data => console.log(JSON.stringify(data, null, 2)));
