import { Header } from "@/components/header";
import { RainbowKitProvider } from "@/providers/rainbowKit";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>NFT Swap</title>
      </Head>
      <RainbowKitProvider>
        <Header />
        <Component {...pageProps} />

        <Toaster position="top-center" />
      </RainbowKitProvider>
    </>
  );
}
