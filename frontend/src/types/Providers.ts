import { Dispatch, ReactNode, SetStateAction } from "react";
import { FetchPolicy } from "@apollo/client";
import { ISubmitOffer } from "./ISubmitOffer";
import { IProfileState } from "./IProfileState";

export interface IContext {
  children: ReactNode;
}

export interface IHistoryContext {
  offers: ISubmitOffer[] | [];
  getOffersInfo: (fetchPolicy?: FetchPolicy) => Promise<void>;
  incluesFrom: (wallet: string) => ISubmitOffer[];
  setOffers: Dispatch<SetStateAction<ISubmitOffer[]>> | (() => {});
}

export interface IProfileContext extends IProfileState {
  setProfileInfo: Dispatch<SetStateAction<IProfileState>> | (() => {});
}
