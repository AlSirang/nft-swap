import { ISubmitOffer } from "./ISubmitOffer";

export interface IProfileState {
  totalNFTs: string | number | undefined;
  account?: string | undefined;
  totalCollections: string | number | undefined;
  collections: any[] | undefined;
  offersSent: ISubmitOffer[];
}
