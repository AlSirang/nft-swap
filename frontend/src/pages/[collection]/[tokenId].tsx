import { NextPageContext } from "next";
import { alchemy } from "@/configs/alchemy.config";
import { extractCollectionInfo } from "@/utils/functions";
import { OffersHistoryProvider } from "@/context/offersHistoryProvider";
import { ICollectionPageProps } from "@/types";
import { getOffers } from "@/core/getOffers";
import { NFTInfo } from "@/views/NFTInfo";

export default function Page(props: ICollectionPageProps) {
  return (
    <OffersHistoryProvider>
      <NFTInfo {...props} />
    </OffersHistoryProvider>
  );
}

export const getServerSideProps = async (context: NextPageContext) => {
  const { collection, tokenId } = context.query;

  const defaultPlayload = {
    contract: null,
    symbol: null,
    name: null,
    description: null,
    title: null,
    image: null,
    tokenId: null,
  };

  try {
    const [metadata, { owners }, allOffers] = await Promise.all([
      alchemy.nft.getNftMetadata(collection as string, tokenId as string),
      alchemy.nft.getOwnersForNft(collection as string, tokenId as string),
      getOffers("cache-first", collection as string, tokenId as string),
    ]);

    return {
      props: {
        ...extractCollectionInfo(metadata),
        owner: owners[0],
        allOffers,
      },
    };
  } catch (err) {
    return {
      props: {
        ...defaultPlayload,
        owner: "",
        allOffers: [],
      },
    };
  }
};
