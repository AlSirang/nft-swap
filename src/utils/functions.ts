import { Nft, OwnedNft } from "alchemy-sdk";
import { profileAvatar } from "./imgSrc";

export const shortenAddress = (address: string | undefined) => {
  if (!address) return "";
  return `${address.slice(0, 5)}....${address.slice(-5)}`;
};

export const extractCollectionInfo = (collection: OwnedNft | Nft) => {
  const contract = collection.contract.address;
  const symbol = collection.contract.symbol;
  const name = collection.contract.name;
  const image = collection.rawMetadata?.image;
  const title = collection.rawMetadata?.name;
  const description = collection.description;

  return {
    contract,
    symbol,
    name,
    description: description ? description : "",
    title: title ? title : `${symbol}# ${collection.tokenId}`,
    image: image ? image : profileAvatar,
    tokenId: collection.tokenId,
  };
};
