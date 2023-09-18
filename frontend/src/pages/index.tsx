import { HomeView } from "@/views/homeView";
import { dummyCollections } from "@/utils/dummyCollections";
import { alchemy } from "@/configs/alchemy.config";
import { extractCollectionInfo } from "@/utils/functions";
import { IHomePageProps } from "@/types";

export default function Home(props: IHomePageProps) {
  return <HomeView {...props} />;
}

export const getServerSideProps = async () => {
  const randomNumber = Math.floor(Math.random() * 2);
  const collection = dummyCollections[randomNumber];

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
    const { nfts } = await alchemy.nft.getNftsForContract(collection);

    return {
      props: extractCollectionInfo(nfts[0]),
    };
  } catch (err) {
    return {
      props: {
        ...defaultPlayload,
      },
    };
  }
};
