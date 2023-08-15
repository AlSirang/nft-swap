"use client";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export const Header = () => {
  const { isConnected } = useAccount();
  return (
    <header className="max-w-7xl m-auto px-5 py-3">
      <div className="flex justify-between">
        <Link href="/" className="text-xl font-semibold">
          Swap NFT
        </Link>

        <nav className="flex gap-10 items-center">
          <Link href="/explore" className="text-lg">
            Explore
          </Link>
          {isConnected && (
            <Link href="/profile" className="text-lg">
              Profile
            </Link>
          )}
          <ConnectButton chainStatus="none" />
        </nav>
      </div>
    </header>
  );
};
