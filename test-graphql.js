const { request, gql } = require('graphql-request');

const query = gql`
  query {
    products(first: 10) {
      nodes {
        title
        productFields {
          powerType
          loIPin
        }
      }
    }
  }
`;

request('http://localhost/lonking-cms/graphql', query)
  .then((data) => console.log(JSON.stringify(data, null, 2)))
  .catch((err) => console.error(err.response.errors));
