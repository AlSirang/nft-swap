import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAccount } from "wagmi";
import OfferForm from "./offerForm";
import { ConnectButton } from "../connectButton";

export const OfferModal = ({ isOpen = false, onClose = () => {} }) => {
  const { isConnected } = useAccount();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => null}>
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
              <Dialog.Panel className="w-full min-h-[3rem] h-full max-w-md transform  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl  font-medium leading-6 text-gray-900 relative"
                >
                  <span className="absolute -right-2 -top-2.5 inline-block  border-gray-900 rounded-lg hover:bg-slate-200">
                    <button
                      className="px-2 felx justify-center items-center"
                      onClick={onClose}
                    >
                      <span>X</span>
                    </button>
                  </span>
                  <span className="pt-3 inline-block">
                    {isConnected && "Make an Offer with your NFT"}
                    {!isConnected && "Please connect your wallet"}
                  </span>
                </Dialog.Title>
                <div className="grid gap-2 mt-4">
                  {!isConnected && (
                    <div className="flex justify-center font-semibold">
                      <span className="bg-[#1e1c1c] rounded-lg px-4 py-2 hover:opacity-90 transition-all">
                        <ConnectButton />
                      </span>
                    </div>
                  )}
                  {isConnected && (
                    <div>
                      <OfferForm />
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
