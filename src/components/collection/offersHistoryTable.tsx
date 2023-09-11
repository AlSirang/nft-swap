import React, { useEffect, useState } from "react";
import Link from "next/link";

import { shortenAddress } from "@/utils/functions";
import { useOfferHistoryProvider } from "@/context/offersHistoryProvider";

export const OffersHistoryTable = ({
  showOfferButton,
}: {
  showOfferButton: boolean;
}) => {
  const { isLoading, logs } = useOfferHistoryProvider();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Offers History</h1>

      {isLoading && <h2>Loading Offers History</h2>}

      {!isLoading && (
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
              {logs.map((log, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 text-black text-center whitespace-nowrap"
                >
                  <td className="px-4 py-2 ">
                    <Link href={`/profile/${log.from}`}>
                      {shortenAddress(log.from)}
                    </Link>
                  </td>
                  <td className="px-4 py-2 ">
                    <Link href={`/collection/${log.fromCollection}`}>
                      {shortenAddress(log.fromCollection)}
                    </Link>
                  </td>
                  <td className="px-4 py-2 ">
                    <Link href={`/${log.fromCollection}/${log.fromId}`}>
                      {log.fromId}
                    </Link>
                  </td>
                  <td className="px-4 py-2 ">{log.msgValue} ETH</td>
                  {showOfferButton && (
                    <td>
                      <button className="px-2 py-1 rounded-md border-2 border-black">
                        Accpet Offer
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
