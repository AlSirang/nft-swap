import { NextPageContext } from "next";
import { ProfileView } from "@/views/profileView";
import { ProfileContextProvider } from "@/context/profileContextProvider";
import { getAllCollections } from "@/core/getAllCollections";
import { apolloClient } from "@/providers/apolloProvider";
import {
  GET_ALL_REMOVED_OFFERS,
  GET_OFFERS_SENT_BY_ADDRESS,
} from "@/utils/gqlQeries";
import { IProfileState, ISubmitOffer } from "@/types";

export default function Page(props: IProfileState) {
  return (
    <ProfileContextProvider>
      <ProfileView {...props} />
    </ProfileContextProvider>
  );
}

export const getServerSideProps = async (context: NextPageContext) => {
  const { account } = context.query;

  try {
    const [
      { data: _submittedOffers },
      { data: removedOffers },
      { totalNFTs, collections, totalCollections },
    ] = await Promise.all([
      apolloClient.query({
        query: GET_OFFERS_SENT_BY_ADDRESS,
        variables: {
          from: account,
        },
      }),
      apolloClient.query({
        query: GET_ALL_REMOVED_OFFERS,
      }),

      getAllCollections(account as string),
    ]);

    const submittedOffersRaw = _submittedOffers.submitOffers;
    const offerRemoveds = removedOffers.offerRemoveds;

    const offersSent: ISubmitOffer[] = [];

    submittedOffersRaw.forEach((submittedOffer: ISubmitOffer) => {
      let isRemoved = false;
      for (const removedOffer of offerRemoveds)
        if (submittedOffer.offerIndex === removedOffer.offerId) {
          isRemoved = true;
          break;
        }

      if (!isRemoved) offersSent.push(submittedOffer);
    });

    return {
      props: { totalNFTs, collections, totalCollections, account, offersSent },
    };
  } catch (err) {
    return {
      props: {
        totalNFTs: 0,
        collections: [],
        totalCollections: 0,
        account: null,
        offersSent: [],
      },
    };
  }
};
