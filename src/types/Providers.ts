import { Dispatch, SetStateAction } from "react";
import { ISubmitOffer } from "@/types";
import { FetchPolicy } from "@apollo/client";

export interface IHistoryContext {
  offers: ISubmitOffer[] | [];
  getOffersInfo: (fetchPolicy?: FetchPolicy) => Promise<void>;
  incluesFrom: (wallet: string) => ISubmitOffer[];
  setOffers: Dispatch<SetStateAction<ISubmitOffer[]>> | (() => {});
}

export interface IProfileContext {
  totalNFTs: string | number | undefined;
  totalCollections: string | number | undefined;
  collections: any[] | undefined;
}
