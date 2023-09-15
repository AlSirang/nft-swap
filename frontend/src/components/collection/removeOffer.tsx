import { Address, getContract } from "viem";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { toast } from "react-hot-toast";
import { useOfferHistoryProvider } from "@/context/offersHistoryProvider";
import { exchnageABI, exchnageAddress } from "@/configs/contract.config";

export const RemoveOffer = () => {
  const publicClient = usePublicClient();
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();

  const { incluesFrom, getOffersInfo } = useOfferHistoryProvider();

  const removeOffer = () => {
    const txPromise = new Promise(async (resolve, reject) => {
      try {
        // @ts-ignore
        const exchangeContract = getContract({
          abi: exchnageABI,
          address: exchnageAddress,
          // @ts-ignore
          walletClient,
        });
        // @ts-ignore

        const offerToRemove = incluesFrom(address);

        if (offerToRemove.length === 0) return reject("Offer does not exist");

        const _offerToRemove = offerToRemove[0];
        // @ts-ignore
        const hash = await exchangeContract.write.removeOffer([
          _offerToRemove.offerIndex,
        ]);

        await publicClient.waitForTransactionReceipt({
          hash,
          confirmations: 2,
        });

        getOffersInfo();
        resolve(hash);
      } catch (err) {
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
    <button
      className="py-1 px-10 text-black bg-white rounded-lg hover:bg-slate-200 transition-all"
      onClick={removeOffer}
    >
      <span className="flex items-center justify-center text-lg font-semibold">
        Remove Offer
      </span>
    </button>
  );
};
