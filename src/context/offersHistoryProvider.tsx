import { createContext, useContext, useEffect, useState } from "react";
import { Address } from "viem";
import { FetchPolicy, useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { GET_Removed_Offers, GET_Submit_Offers } from "@/utils/gqlQeries";
import { IHistoryContext } from "./types";
import { ISubmitOffer } from "@/types";

const OffersHistoryContext = createContext<IHistoryContext>({
  offers: [],
  isLoading: true,
  getOffersInfo: (fetchPolicy?: FetchPolicy) => Promise.resolve(),
  incluesFrom: () => [],
});

interface IProps {
  children: React.ReactNode;
}

export const OffersHistoryProvider = ({ children }: IProps) => {
  //** hooks
  const router = useRouter();
  const apolloClient = useApolloClient();

  //** State
  const [offers, setOffers] = useState<ISubmitOffer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getOffersInfo = async (fetchPolicy: FetchPolicy | undefined) => {
    try {
      setIsLoading(true);

      const toCollection = router.query.collection as Address;
      const toId = router.query.tokenId as string;

      const [{ data: _submittedOffers }, { data: removedOffers }] =
        await Promise.all([
          apolloClient.query({
            query: GET_Submit_Offers,
            variables: {
              toId,
              toCollection,
            },
            fetchPolicy: fetchPolicy || "network-only",
          }),
          apolloClient.query({
            query: GET_Removed_Offers,
            variables: {
              toId,
              toCollection,
            },
            fetchPolicy: fetchPolicy || "network-only",
          }),
        ]);

      if (!_submittedOffers) return;
      const submittedOffersRaw = _submittedOffers.submitOffers;
      if (!removedOffers) return setOffers(submittedOffersRaw);
      const offerRemoveds = removedOffers.offerRemoveds;

      const submittedOffers: ISubmitOffer[] = [];

      submittedOffersRaw.forEach((submittedOffer: ISubmitOffer) => {
        let isRemoved = false;
        for (const removedOffer of offerRemoveds)
          if (submittedOffer.offerIndex === removedOffer.offerId) {
            isRemoved = true;
            break;
          }

        if (!isRemoved) submittedOffers.push(submittedOffer);
      });

      setOffers(submittedOffers);
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  };

  const incluesFrom = (wallet: string) => {
    return offers.filter(
      (offer) => offer.from.toLowerCase() === wallet.toLowerCase()
    );
  };

  useEffect(() => {
    getOffersInfo("cache-first");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  return (
    <OffersHistoryContext.Provider
      value={{
        offers,
        isLoading,
        getOffersInfo,
        incluesFrom,
      }}
    >
      {children}
    </OffersHistoryContext.Provider>
  );
};

export const useOfferHistoryProvider = () => useContext(OffersHistoryContext);
