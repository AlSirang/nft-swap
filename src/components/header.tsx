import { useEffect, useRef } from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
import { httpClient } from "@/configs/axios.config";
import { ConnectButton } from "./connectButton";

export const Header = () => {
  const { address } = useAccount();
  const isDispached = useRef(false);
  useEffect(() => {
    if (address && !isDispached.current) {
      isDispached.current = true;
      httpClient
        .post("/create-user", {
          address,
        })
        .catch((err) => {
          console.log("Create User Error: ", err);
        });
    }
  }, [address]);

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
