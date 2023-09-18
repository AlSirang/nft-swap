import { Address } from "viem";
import { FetchPolicy } from "@apollo/client";
import { apolloClient } from "@/providers/apolloProvider";
import { GET_Removed_Offers, GET_Submit_Offers } from "@/utils/gqlQeries";
import { ISubmitOffer } from "@/types";

export const getOffers = async (
  fetchPolicy: FetchPolicy | undefined,
  toCollection: string | Address,
  toId: string | number
) => {
  try {
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
    if (!removedOffers) return submittedOffersRaw;
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

    return submittedOffers;
  } catch (err) {
    console.log("getOffersInfo: ", err);

    return [];
  }
};
