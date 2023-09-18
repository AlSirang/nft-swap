import React from "react";
import Link from "next/link";
import { deserialize } from "wagmi";
import { formatEther } from "viem";
import { shortenAddress } from "@/utils/functions";
import { ISubmitOffer } from "@/types";

interface IProps {
  offers: ISubmitOffer[] | [];
  showOfferButton?: boolean;
  onAccpet?: (() => void) | ((offerIndex: number | string) => Promise<void>);
}

export const OffersTable = ({
  showOfferButton,
  offers = [],
  onAccpet = () => {},
}: IProps) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-x-scroll scrollbar-hide">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr className="text-center text-black whitespace-nowrap">
            <th className="px-4 py-2">From</th>
            <th className="px-4 py-2">Collection</th>
            <th className="px-4 py-2">TokenId</th>
            <th className="px-4 py-2">ETH Price</th>
            {showOfferButton && <th>Action</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {offers.map((offer, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 text-black text-center whitespace-nowrap"
            >
              <td className="px-4 py-2 ">
                <Link
                  href={`/profile/${offer.from}`}
                  className="hover:underline transition-all"
                >
                  {shortenAddress(offer.from)}
                </Link>
              </td>
              <td className="px-4 py-2 ">
                <Link
                  href={`/collections/${offer.fromCollection}`}
                  className="hover:underline transition-all"
                >
                  {shortenAddress(offer.fromCollection)}
                </Link>
              </td>
              <td className="px-4 py-2 ">
                <Link
                  href={`/${offer.fromCollection}/${offer.fromId}`}
                  className="hover:underline transition-all"
                >
                  {offer.fromId}
                </Link>
              </td>
              <td className="px-4 py-2 ">
                {formatEther(deserialize(offer.msgValue as string))} ETH
              </td>
              {showOfferButton && (
                <td>
                  <button
                    onClick={onAccpet && onAccpet.bind(this, offer.offerIndex)}
                    className="px-2 py-1 rounded-md border-2 border-black"
                  >
                    Accpet Offer
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
