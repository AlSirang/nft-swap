import { ICardProps } from "./ICardProps";
import { ISubmitOffer } from "./ISubmitOffer";

export interface ICollectionPageProps extends ICardProps {
  owner: string | null;
  allOffers: ISubmitOffer[] | [];
}

export interface IHomePageProps extends ICardProps {}
