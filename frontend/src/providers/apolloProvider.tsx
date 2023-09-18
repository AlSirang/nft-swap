import {
  ApolloClient,
  ApolloProvider as ApolloClientProvider,
  InMemoryCache,
} from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/52562/nftexchange/v1",
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

export const ApolloProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloClientProvider client={apolloClient}>
      {children}
    </ApolloClientProvider>
  );
};
