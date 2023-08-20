import Link from "next/link";
import { ConnectButton } from "./connectButton";

export const Header = () => {
  return (
    <header className="max-w-7xl m-auto px-5 py-3">
      <div className="flex justify-between">
        <Link href="/">
          <picture>
            <img
              src="/icons/logo-white.png"
              alt="logo"
              className="max-h-[60px]"
            />
          </picture>
        </Link>

        <nav className="flex gap-10 items-center">
          <Link
            href="/explore"
            className="text-2xl font-semibold hover:text-slate-300 transition-all"
          >
            Explore
          </Link>
          <Link
            href="/profile"
            className="text-2xl font-semibold hover:text-slate-300 transition-all"
          >
            Profile
          </Link>

          <ConnectButton />
        </nav>
      </div>
    </header>
  );
};
