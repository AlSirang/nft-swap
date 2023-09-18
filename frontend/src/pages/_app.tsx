import { Header } from "@/components/header";
import { RainbowKitProvider } from "@/providers/rainbowKit";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";
import { Footer } from "@/components/footer";
import { ApolloProvider } from "@/providers/apolloProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>NFT Swap</title>
      </Head>
      <RainbowKitProvider>
        <ApolloProvider>
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
