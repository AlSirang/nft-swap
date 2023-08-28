export interface ICardProps {
  contract?: string | undefined;
  symbol?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  title?: string | undefined;
  image?: string | undefined;
  tokenId?: number | undefined;
}
export interface IHomePageProps extends ICardProps {}
export interface ICollectionPageProps extends ICardProps {
  owner: string | null;
}

export interface IWalletNFT {
  contract: string;
  symbol: string | null;
  name: string | null;
  description: string;
  title: string;
  image: string;
  tokenId: string;
}

export interface ISubmitOffer {
  fromCollection: string;
  toCollection: string;
  from: string;
  toId: number;
  fromId: number;
  msgValue: number;
  offerIndex: number;
}
