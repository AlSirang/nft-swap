import { Header } from "@/components/header";
import { RainbowKitProvider } from "@/providers/rainbowKit";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Footer } from "@/components/footer";

export const apolloClient = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/52562/nftexchange/v1",
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>NFT Swap</title>
      </Head>
      <RainbowKitProvider>
        <ApolloProvider client={apolloClient}>
          <main className="flex flex-col min-h-screen">
            <div>
              <Header />
            </div>
            <div className="flex-grow">
              <Component {...pageProps} />
            </div>
            <Toaster position="top-center" />

            <Footer />
          </main>
        </ApolloProvider>
      </RainbowKitProvider>
    </>
  );
}
