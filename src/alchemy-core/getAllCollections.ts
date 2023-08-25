import { alchemy } from "@/configs/alchemy.config";
import { extractCollectionInfo } from "@/utils/functions";

export const getAllCollections = async (address: string) => {
  try {
    const results = await alchemy.nft.getNftsForOwner(address);

    const totalNFTs = results["totalCount"];
    const collectionsRaw = results["ownedNfts"];

    const collectionAddresses: string[] = [];

    const collections = collectionsRaw.map((collection) => {
      const address = collection.contract.address;
      if (!collectionAddresses.includes(address))
        collectionAddresses.push(address);

      return extractCollectionInfo(collection);
    });

    return {
      totalNFTs,
      totalCollections: collectionAddresses.length,
      collections,
    };
  } catch (err) {
    console.log("getAllCollectionsERR: ", err);

    return {
      totalNFTs: 0,
      totalCollections: 0,
      collections: [],
    };
  }
};
