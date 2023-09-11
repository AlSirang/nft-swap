import { ISubmitOffer } from "@/types";
import { Address } from "viem";

export interface IHistoryContext {
  logs: ISubmitOffer[] | [];
  isLoading: boolean;
  getAcceptOfferLogs:
    | (() => null)
    | ((tokenId: string, toCollection: Address) => Promise<void>);
  incluesFrom: (wallet: string) => ISubmitOffer[];
}

export interface IProfileContext {
  totalNFTs: string | number | undefined;
  totalCollections: string | number | undefined;
  collections: any[] | undefined;
}
