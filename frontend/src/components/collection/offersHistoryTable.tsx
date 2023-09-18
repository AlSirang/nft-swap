import React, { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import {
  deserialize,
  useAccount,
  usePublicClient,
  useWalletClient,
} from "wagmi";
import { formatEther, getContract } from "viem";
import { shortenAddress } from "@/utils/functions";
import { useOfferHistoryProvider } from "@/context/offersHistoryProvider";
import {
  ERC721ABI,
  exchnageABI,
  exchnageAddress,
} from "@/configs/contract.config";
import { OffersTable } from "../offersTable";

export const OffersHistoryTable = ({
  showOfferButton,
}: {
  showOfferButton: boolean;
}) => {
  const { getOffersInfo, offers } = useOfferHistoryProvider();
  const router = useRouter();
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const apporveToastId = useRef<any>();

  const onAccpet = async (offerIndex: number | string) => {
    const txPromise = new Promise(async (resolve, reject) => {
      try {
        const { collection } = router.query;
        // @ts-ignore
        const collectContract = getContract({
          abi: ERC721ABI,
          // @ts-ignore
          address: collection,
          publicClient,
          // @ts-ignore
          walletClient,
        });

        const isApprovedForAll = await collectContract.read.isApprovedForAll([
          address,
          exchnageAddress,
        ]);

        if (!isApprovedForAll) {
          apporveToastId.current = toast(
            "Please apporve Exchange address. This is one time operation",
            {
              duration: Infinity,
            }
          );

          // @ts-ignore
          const hash = await collectContract.write.setApprovalForAll([
            exchnageAddress,
            true,
          ]);
          toast.dismiss(apporveToastId.current);

          await publicClient.waitForTransactionReceipt({
            hash,
          });
        }

        const exchangeContract = getContract({
          abi: exchnageABI,
          address: exchnageAddress,
          // @ts-ignore
          walletClient,
        });

        // @ts-ignore
        const hash = await exchangeContract.write.accpetOffer([offerIndex]);

        await publicClient.waitForTransactionReceipt({
          hash,
          confirmations: 2,
        });

        getOffersInfo();

        resolve(hash);
      } catch (err) {
        toast.dismiss(apporveToastId.current);
        // @ts-ignore
        reject(err?.shortMessage);
      }
    });

    toast.promise(txPromise, {
      loading: "Transaction is in progress",
      success: "Transaction completed successfully",
      error: (err) => err,
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Offers History</h1>

      <OffersTable
        showOfferButton={showOfferButton}
        offers={offers}
        onAccpet={onAccpet}
      />
    </div>
  );
};
