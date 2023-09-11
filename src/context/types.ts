import { ISubmitOffer } from "@/types";
import { FetchPolicy } from "@apollo/client";

export interface IHistoryContext {
  offers: ISubmitOffer[] | [];
  isLoading: boolean;
  getOffersInfo: (fetchPolicy?: FetchPolicy) => Promise<void>;
  incluesFrom: (wallet: string) => ISubmitOffer[];
}

export interface IProfileContext {
  totalNFTs: string | number | undefined;
  totalCollections: string | number | undefined;
  collections: any[] | undefined;
}
