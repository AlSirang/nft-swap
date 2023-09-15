import React from "react";
import {
  darkTheme,
  getDefaultWallets,
  lightTheme,
  midnightTheme,
  RainbowKitProvider as RkitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import "@rainbow-me/rainbowkit/styles.css";

const { chains, publicClient } = configureChains(
  [sepolia],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "NFT Swap",
  projectId: "3828bedc82f5ba0e923c413da3250b1a",
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
