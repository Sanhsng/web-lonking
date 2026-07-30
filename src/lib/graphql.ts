import { GraphQLClient } from "graphql-request";

export const graphqlClient = new GraphQLClient(
    process.env.WORDPRESS_GRAPHQL_ENDPOINT!,
    {
      fetch: (url, options) => fetch(url, { ...options, next: { revalidate: 60 } }),
    }
);