import { GraphQLClient } from "graphql-request";

const endpoint = process.env.WORDPRESS_API_URL;

if (!endpoint) {
  throw new Error("WORDPRESS_API_URL non è definita in .env.local");
}

export const graphqlClient = new GraphQLClient(endpoint);
