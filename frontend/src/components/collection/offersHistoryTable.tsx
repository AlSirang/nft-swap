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
                      onClick={onAccpet.bind(this, offer.offerIndex)}
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
    </div>
  );
};
