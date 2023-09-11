import { createContext, useContext, useEffect, useState } from "react";
import { Address, decodeEventLog, parseAbiItem, parseEther } from "viem";
import { useRouter } from "next/router";
import { usePublicClient } from "wagmi";
import {
  DEPLOYED_AT_BLOCK,
  exchnageABI,
  exchnageAddress,
} from "@/configs/contract.config";
import { ISubmitOffer } from "@/types";
import { IHistoryContext } from "./types";

const OffersHistoryContext = createContext<IHistoryContext>({
  logs: [],
  isLoading: true,
  getAcceptOfferLogs: () => null,
  incluesFrom: () => [],
});

interface IProps {
  children: React.ReactNode;
}

export const OffersHistoryProvider = ({ children }: IProps) => {
  const publicClient = usePublicClient();
  //** hooks
  const router = useRouter();
  //** State
  const [logs, setLogs] = useState<ISubmitOffer[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const getAcceptOfferLogs = async (tokenId: string, toCollection: Address) => {
    try {
      const [submitOfferLogs, removeOfferLogs] = await Promise.all([
        publicClient.getLogs({
          address: exchnageAddress,
          event: parseAbiItem(
            "event SubmitOffer(uint256 indexed toId, uint256, uint256, uint256, address indexed toCollection, address, address)"
          ),
          args: {
            toId: BigInt(tokenId),
            toCollection: toCollection,
          },
          fromBlock: BigInt(DEPLOYED_AT_BLOCK),
        }),
        publicClient.getLogs({
          address: exchnageAddress,
          event: parseAbiItem(
            "event SubmitOffer(uint256 indexed toId, uint256, uint256, uint256, address indexed toCollection, address, address)"
          ),
          args: {
            toId: BigInt(tokenId),
            toCollection: toCollection,
          },
          fromBlock: BigInt(DEPLOYED_AT_BLOCK),
        }),
      ]);

      const decodedLogs = submitOfferLogs.map((log) => {
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

  const incluesFrom = (wallet: string) => {
    return logs.filter(
      (log) => log.from.toLowerCase() === wallet.toLowerCase()
    );
  };

  useEffect(() => {
    const toCollection = router.query.collection as Address;

    const tokenId = router.query.tokenId as string;

    if (publicClient) getAcceptOfferLogs(tokenId, toCollection);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicClient, router.query]);

  return (
    <OffersHistoryContext.Provider
      value={{ logs, isLoading, getAcceptOfferLogs, incluesFrom }}
    >
      {children}
    </OffersHistoryContext.Provider>
  );
};

export const useOfferHistoryProvider = () => useContext(OffersHistoryContext);
