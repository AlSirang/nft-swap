import { HomeMain } from "@/components/home/homeMain";
import { dummyCollections } from "@/utils/dummyCollections";
import { alchemy } from "@/configs/alchemy.config";
import { HomeProps } from "@/types";

export default function Home(props: HomeProps) {
  console.log(props);

  return (
    <section>
      <HomeMain />
    </section>
  );
}

export const getServerSideProps = async () => {
  const randomNumber = Math.floor(Math.random() * 2);

  const collection = dummyCollections[randomNumber];

  const defaultPlayload = {
    address: undefined,
    description: undefined,
    image: undefined,
    name: undefined,
  };

  try {
    const { nfts } = await alchemy.nft.getNftsForContract(collection, {
      pageSize: 1,
    });

    return {
      props: {
        address: nfts[0].contract.address,
        ...nfts[0].rawMetadata,
      },
    };
  } catch (err) {
    return {
      props: {
        ...defaultPlayload,
      },
    };
  }
};
