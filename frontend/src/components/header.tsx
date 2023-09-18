import { useEffect, useRef } from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
import { httpClient } from "@/configs/axios.config";
import { ConnectButton } from "./connectButton";
import { Popover } from "@headlessui/react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { shortenAddress } from "@/utils/functions";

export const Header = () => {
  const { address } = useAccount();
  const isDispached = useRef(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onOpen = () => setIsMenuOpen(true);

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
    <>
      <header className="max-w-7xl m-auto px-5 py-3">
        <div className="flex gap-16">
          <Link href="/">
            <picture>
              <img
                src="/icons/logo-white.png"
                alt="logo"
                className="tablet:max-h-[60px] h-10"
              />
            </picture>
          </Link>

          <nav className="flex flex-grow justify-between items-center">
            <div />
            <span className="tablet:flex gap-5 hidden">
              <Link
                href="/collections"
                className="text-lg font-medium hover:underline"
              >
                Top Collections
              </Link>
              <Link href="/" className="text-lg font-medium hover:underline">
                Collectors
              </Link>
            </span>
            <span className="flex gap-5 tablet:gap-10 items-end tablet:items-center flex-col-reverse tablet:flex-row">
              <ConnectButton />

              <button onClick={onOpen}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </span>
          </nav>
        </div>
      </header>

      <Menu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
    </>
  );
};

function Menu({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { isConnected, address } = useAccount();

  const onClose = () => {
    if (setIsOpen) setIsOpen(false);
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="text-black w-full max-w-md transform overflow-hidden rounded-xl bg-[#fffff3] p-6 text-left align-middle shadow-xl transition-all">
                  <div className="grid gap-1" onClick={onClose}>
                    {!isConnected && (
                      <div className="sub-connect-wallet">
                        <span className="text-lg font-medium hover:bg-gray-800 transition-all bg-black text-white inline-block mobile-connect px-3 py-1 rounded-md">
                          <ConnectButton />
                        </span>
                      </div>
                    )}
                    {isConnected && (
                      <Link
                        href={`/profile/${address}`}
                        className="text-lg font-medium hover:underline"
                      >
                        Account ({shortenAddress(address)})
                      </Link>
                    )}

                    <span className="flex flex-col tablet:hidden">
                      <Link
                        href="/collections"
                        className="text-lg font-medium hover:underline"
                      >
                        Top Collections
                      </Link>
                      <Link
                        href="/"
                        className="text-lg font-medium hover:underline"
                      >
                        Collectors
                      </Link>
                    </span>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
