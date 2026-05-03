import { HttpLink } from "@apollo/client";
import {
  InMemoryCache,
  ApolloClient,
  registerApolloClient,
} from "@apollo/client-integration-nextjs";

const apolloContext = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GATEWAY_URL || "http://localhost:4000/graphql",
    }),
  });
});

export const getClient: any = apolloContext.getClient;
