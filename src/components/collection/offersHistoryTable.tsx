import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { usePublicClient } from "wagmi";
import { Address, decodeEventLog, parseAbiItem, parseEther } from "viem";
import {
  DEPLOYED_AT_BLOCK,
  exchnageABI,
  exchnageAddress,
} from "@/configs/contract.config";
import { ISubmitOffer } from "@/types";
import { shortenAddress } from "@/utils/functions";

export const OffersHistoryTable = () => {
  const publicClient = usePublicClient();
  const [logs, setLogs] = useState<ISubmitOffer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const getAcceptOfferLogs = async (tokenId: string, toCollection: Address) => {
    try {
      const logs = await publicClient.getLogs({
        address: exchnageAddress,
        event: parseAbiItem(
          "event SubmitOffer(uint256 indexed toId, uint256, uint256, uint256, address indexed toCollection, address, address)"
        ),
        args: {
          toId: BigInt(tokenId),
          toCollection: toCollection,
        },
        fromBlock: BigInt(DEPLOYED_AT_BLOCK),
      });

      const decodedLogs = logs.map((log) => {
        const { args } = decodeEventLog({
          abi: exchnageABI,
          eventName: "SubmitOffer",
          data: log.data,
          topics: log.topics,
        });

        return {
          // @ts-ignore
          toId: parseInt(args.toId),
          // @ts-ignore
          fromId: parseInt(args.fromId),
          // @ts-ignore
          msgValue: parseInt(parseEther(args.msgValue || "0").toString()),
          // @ts-ignore
          fromCollection: args.fromCollection,
          // @ts-ignore
          toCollection: args.toCollection,
          // @ts-ignore
          from: args.from,
          // @ts-ignore
          offerIndex: parseInt(args.offerIndex),
        };
      });

      setLogs(decodedLogs);
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  };
  useEffect(() => {
    const toCollection = router.query.collection as Address;

    const tokenId = router.query.tokenId as string;

    if (publicClient) getAcceptOfferLogs(tokenId, toCollection);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicClient, router.query]);
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
