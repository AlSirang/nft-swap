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
export interface ICollectionPageProps extends ICardProps {}
