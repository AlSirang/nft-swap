import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useAccount } from "wagmi";
import { Listbox, Transition } from "@headlessui/react";
import { getAllCollections } from "@/alchemy-core/getAllCollections";
import { CheckIcon, ChevronIcon } from "@/svgIcons";
import { IWalletNFT } from "@/types";
import { toast } from "react-hot-toast";

export default function OfferForm() {
  const { address } = useAccount();
  const [selected, setSelected] = useState<IWalletNFT | null>(null);
  const [inWallet, setInWallet] = useState<IWalletNFT[]>([]);

  useEffect(() => {
    address &&
      getAllCollections(address).then(({ collections }) => {
        setInWallet(collections);
      });
  }, [address]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const tokenId = selected?.tokenId;

      if (!tokenId) return toast.error("Please select a NFT");
    } catch (err) {}
  };
  return (
    <form onSubmit={onSubmit}>
      <Dropdown
        inWallet={inWallet}
        selected={selected}
        setSelected={setSelected}
      />
      <div className="w-full min-w-[200px] mt-4">
        <label className="text-sm font-medium leading-6 text-gray-900">
          ETH (optional)
        </label>
        <input
          className="mt-1 w-full rounded-md border border-gray-300 bg-transparent px-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all outline-none focus:ring-1 ring-gray-300 text-gray-900 py-1.5 h-11"
          type="number"
          step="any"
          min="0"
        />
      </div>

      <div className="mt-4">
        <button className="py-1 px-10 text-white bg-[#1e1c1c] rounded-lg hover:bg-[#1e1c1fd0] transition-all">
          Send Offer
        </button>
      </div>
    </form>
  );
}

const Dropdown: React.FunctionComponent<{
  selected: IWalletNFT | null;
  inWallet: IWalletNFT[];
  setSelected: React.Dispatch<React.SetStateAction<IWalletNFT | null>>;
}> = ({ selected, inWallet, setSelected }) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-900">
            Select NFT to Offer
          </Listbox.Label>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                {selected && (
                  <>
                    <picture>
                      <img
                        src={selected?.image}
                        alt=""
                        className="h-10 w-10 flex-shrink-0 rounded-md"
                      />
                    </picture>

                    <span className="ml-3 block truncate">
                      {selected.symbol} ({selected.tokenId})
                    </span>
                  </>
                )}

                {!selected && (
                  <>
                    <picture>
                      <img
                        src="/img/blank-img.png"
                        alt=""
                        className="h-10 w-10 flex-shrink-0 rounded-md"
                      />
                    </picture>
                    <span className="ml-3 block truncate">
                      Select a NFT to Offer
                    </span>
                  </>
                )}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronIcon />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={React.Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {inWallet.map((collection) => (
                  <Listbox.Option
                    key={collection.tokenId}
                    className={({ active }) =>
                      classNames(
                        {
                          "bg-slate-200": active,
                        },
                        "text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={collection}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <picture>
                            <img
                              src={collection.image}
                              alt=""
                              className="h-10 w-10 flex-shrink-0 rounded-md"
                            />
                          </picture>
                          <span
                            className={classNames(
                              {
                                "font-normal": !selected,
                                "font-semibold": selected,
                              },
                              "ml-3 block truncate"
                            )}
                          >
                            {collection.symbol} ({collection.tokenId})
                          </span>
                        </div>

                        {selected && (
                          <span
                            className={classNames(
                              {
                                "bg-slate-200 ": active,
                              },
                              "text-black absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon />
                          </span>
                        )}
                        {!selected && null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};