import React from "react";

export const OffersHistoryTable = () => {
  const trades = [
    {
      from: "From address",
      collection: "NAME (SYMBOL)",
      tokenId: 21,
      value: 12,
    },
    {
      from: "From address",
      collection: "NAME (SYMBOL)",
      tokenId: 21,
      value: 12,
    },
    {
      from: "From address",
      collection: "NAME (SYMBOL)",
      tokenId: 21,
      value: 12,
    },
    {
      from: "From address",
      collection: "NAME (SYMBOL)",
      tokenId: 21,
      value: 12,
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Offers History</h1>
      <div className="bg-white rounded-lg shadow overflow-x-scroll scrollbar-hide">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr className="text-center text-black whitespace-nowrap">
              <th className="px-4 py-2">From</th>
              <th className="px-4 py-2">Collection</th>
              <th className="px-4 py-2">TokenId</th>
              <th className="px-4 py-2">ETH Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {trades.map((trade, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 text-black text-center whitespace-nowrap"
              >
                <td className="px-4 py-2 ">{trade.from}</td>
                <td className="px-4 py-2 ">{trade.collection}</td>
                <td className="px-4 py-2 ">{trade.tokenId}</td>
                <td className="px-4 py-2 ">{trade.value} ETH</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
