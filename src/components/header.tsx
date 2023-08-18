import Link from "next/link";
import { useAccount } from "wagmi";
import { ConnectButton } from "./connectButton";

export const Header = () => {
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
          <Link href="/profile" className="text-lg">
            Profile
          </Link>

          <ConnectButton />
        </nav>
      </div>
    </header>
  );
};
