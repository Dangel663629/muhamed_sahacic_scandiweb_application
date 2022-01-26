import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
  //had to disable cache
  //apollo was fetching wrong attribute values from cache in products that share attribute names e.g. jacket and shoe both share attribute name size, or capacity for tech products
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache",
    },
  },
});

export default client;
