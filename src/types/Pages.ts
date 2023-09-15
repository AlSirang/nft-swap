import { ICardProps } from "./ICardProps";
import { ISubmitOffer } from "./ISubmitOffer";

export interface ICollectionPageProps extends ICardProps {
  owner: string | null;
  allOffers: ISubmitOffer[] | [];
}

export interface IHomePageProps extends ICardProps {}
export interface IProfilePage {
  totalNFTs: string | number | undefined;
  address?: string | undefined;
  totalCollections: string | number | undefined;
  collections: any[] | undefined;
}
