import { useEffect, useRef } from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
import { httpClient } from "@/configs/axios.config";
import { ConnectButton } from "./connectButton";
import { Popover } from "@headlessui/react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

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
            {/* <Link
            href="/accounts"
            className="text-2xl font-semibold hover:text-slate-300 transition-all"
          ></Link>
          <Link
            href={`/profile`}
            className="text-2xl font-semibold hover:text-slate-300 transition-all"
          ></Link> */}

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
                    {!isConnected && <ConnectButton />}
                    {isConnected && (
                      <Link
                        href={`/profile/${address}`}
                        className="hover:bg-slate-300 rounded-md  transition-all"
                      >
                        <span className="px-3 py-3 flex items-center gap-3">
                          <span className="h-6 w-6">
                            <svg
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M12 .04a1.743 1.743 0 0 0-.537 3.401l-.631 2.579H2.456A2.456 2.456 0 0 0 0 8.476v13.029a2.456 2.456 0 0 0 2.456 2.456h19.088c1.356 0 2.456-1.1 2.456-2.456V8.476c0-1.356-1.1-2.456-2.456-2.456h-8.403l-.616-2.575A1.743 1.743 0 0 0 11.999.04zM3.933 7.881h16.136c1.101 0 1.994.893 1.994 1.994v10.117a1.994 1.994 0 0 1-1.994 1.994H3.933a1.994 1.994 0 0 1-1.994-1.994V9.875c0-1.101.893-1.994 1.994-1.994zm3.254 2.312a4.575 4.575 0 1 0 0 9.15 4.575 4.575 0 0 0 0-9.15zm9.743 0a4.575 4.575 0 1 0 0 9.15 4.575 4.575 0 0 0 0-9.15zm-9.743 1.07a3.506 3.506 0 1 1 0 7.011 3.506 3.506 0 0 1 0-7.011zm9.743 0a3.506 3.506 0 1 1 0 7.011 3.506 3.506 0 0 1 0-7.011zm-9.743 1.663a1.843 1.843 0 1 0 0 3.686 1.843 1.843 0 0 0 0-3.686zm9.743 0a1.843 1.843 0 1 0 0 3.686 1.843 1.843 0 0 0 0-3.686zm-6.927 6.5v2.159h.706v-2.159h-.706zm1.077 0v2.159h.705v-2.159h-.705zm1.076 0v2.159h.706v-2.159h-.706zm1.077 0v2.159h.706v-2.159h-.706zm1.077.03v2.1a1.08 1.08 0 0 0 .829-1.049v-.001c0-.51-.354-.937-.829-1.05zm-4.678.028a1.08 1.08 0 0 0-.731 1.021v.001c0 .474.306.876.731 1.021v-2.043z" />
                            </svg>
                          </span>
                          <span className="text-xl font-semibold">Profie</span>
                        </span>
                      </Link>
                    )}

                    <Link
                      href="/collectors"
                      className="hover:bg-slate-300 rounded-md  transition-all"
                    >
                      <span className="px-3 py-3 flex items-center gap-3">
                        <span className="h-5 w-5">
                          <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M1.875 0C.839 0 0 .84 0 1.875v4.792h24V1.875C24 .839 23.16 0 22.125 0zM0 8.889v6.222h24V8.89zm0 8.444v4.792C0 23.161.84 24 1.875 24h9v-6.667zm13.125 0V24h9C23.161 24 24 23.16 24 22.125v-4.792z" />
                          </svg>
                        </span>
                        <span className="text-xl font-semibold">
                          Top Collectors
                        </span>
                      </span>
                    </Link>
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
