import { createContext, useContext, useState } from "react";
import { Address } from "viem";
import { FetchPolicy } from "@apollo/client";
import { useRouter } from "next/router";
import { getOffers } from "@/core/getOffers";
import { ISubmitOffer, IHistoryContext } from "@/types";

const OffersHistoryContext = createContext<IHistoryContext>({
  offers: [],
  getOffersInfo: (fetchPolicy?: FetchPolicy) => Promise.resolve(),
  incluesFrom: () => [],
  setOffers: () => {},
});

interface IProps {
  children: React.ReactNode;
}

export const OffersHistoryProvider = ({ children }: IProps) => {
  //** hooks
  const router = useRouter();

  //** State
  const [offers, setOffers] = useState<ISubmitOffer[]>([]);

  const getOffersInfo = async (fetchPolicy?: FetchPolicy | undefined) => {
    try {
      const toCollection = router.query.collection as Address;
      const toId = router.query.tokenId as string;

      const submittedOffers = await getOffers(fetchPolicy, toCollection, toId);

      setOffers(submittedOffers);
    } catch (err) {
      console.log("getOffersInfo: ", err);
    }
  };

  const incluesFrom = (wallet: string) => {
    return offers.filter(
      (offer) => offer.from.toLowerCase() === wallet.toLowerCase()
    );
  };

  return (
    <OffersHistoryContext.Provider
      value={{
        offers,
        getOffersInfo,
        setOffers,
        incluesFrom,
      }}
    >
      {children}
    </OffersHistoryContext.Provider>
  );
};

export const useOfferHistoryProvider = () => useContext(OffersHistoryContext);
