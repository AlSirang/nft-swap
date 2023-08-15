import { Header } from "@/components/header";
import { RainbowKitProvider } from "@/providers/rainbowKit";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>NFT Swap</title>
      </Head>
      <RainbowKitProvider>
        <Header />
        <main className="max-w-7xl m-auto px-4">
          <Component {...pageProps} />
        </main>
      </RainbowKitProvider>
    </>
  );
}
