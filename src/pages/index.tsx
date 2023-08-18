import { HomeMain } from "@/components/home/homeMain";
import { dummyCollections } from "@/utils/dummyCollections";
import { alchemy } from "@/configs/alchemy.config";
import { extractCollectionInfo } from "@/utils/functions";
import { IHomePageProps } from "@/types";

export default function Home(props: IHomePageProps) {
  return (
    <section>
      <HomeMain {...props} />
    </section>
  );
}

export const getServerSideProps = async () => {
  const collection = dummyCollections[0];

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
    console.log(err);
    return {
      props: {
        ...defaultPlayload,
      },
    };
  }
};
