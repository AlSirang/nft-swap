import { ICollectionPageProps } from "./Pages";

export interface ICollectionInfo {
  name: string | undefined;
  symbol: string | undefined;
  contract: string | undefined;
}
export interface ICollectionPage {
  nfts: ICollectionPageProps[];
  pageKey: string | null;
}
