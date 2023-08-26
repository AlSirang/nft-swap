import React from "react";
import {
  darkTheme,
  getDefaultWallets,
  lightTheme,
  midnightTheme,
  RainbowKitProvider as RkitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia, localhost } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import "@rainbow-me/rainbowkit/styles.css";

const { chains, publicClient } = configureChains(
  [sepolia, localhost],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "NFT Exchange",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

export const RainbowKitProvider: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });
  return (
    <WagmiConfig config={wagmiConfig}>
      <RkitProvider
        theme={lightTheme({
          accentColor: "#fff",
          accentColorForeground: "black",
        })}
        chains={chains}
      >
        {children}
      </RkitProvider>
    </WagmiConfig>
  );
};
