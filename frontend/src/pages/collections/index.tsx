import Link from "next/link";
import { GET_COLLECTIONS } from "@/utils/gqlQeries";
import { alchemy } from "@/configs/alchemy.config";
import { apolloClient } from "@/providers/apolloProvider";
import { EyeIcon } from "@/svgIcons";

const pageSize = 20;

interface IOffer {
  toCollection: string;
  fromCollection: string;
}

interface ICollection {
  contract: string | null;
  totalSupply: string | null;
  name: string | null;
  symbol: string | null;
}

interface IProps {
  collectionsInfo: ICollection[];
}
export default function Index({ collectionsInfo }: IProps) {
  if (collectionsInfo.length == 0) return <h2>Collections Not Found</h2>;

  return (
    <section className="container mx-auto mt-16 px-4">
      <h1 className="font-semibold text-xl tablet:text-2xl mb-10">
        Top Collections
      </h1>
      <div className="cards-grid">
        {collectionsInfo.map(({ name, symbol, contract, totalSupply }) => (
          <div
            key={contract}
            className="bg-[#fffff3] text-black inline-block py-4 px-2 rounded-md"
          >
            <div className="px-3">
              <Link
                href={`/collections/${contract}`}
                className="hover:underline text-lg flex items-center justify-between"
              >
                <span>
                  {name} ({symbol})
                </span>

                <EyeIcon className="h-6 w-6" />
              </Link>

              <div className="flex justify-between items-center mt-2 font-medium">
                <p>Total Supply</p>
                <p>{totalSupply}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export const getServerSideProps = async () => {
  try {
    const {
      data: { submitOffers },
    } = await apolloClient.query({
      query: GET_COLLECTIONS,
      variables: {
        page: pageSize,
      },
    });

    const collections: string[] = [];

    submitOffers.forEach((offer: IOffer) => {
      if (!collections.includes(offer.toCollection))
        collections.push(offer.toCollection);

      if (!collections.includes(offer.fromCollection))
        collections.push(offer.fromCollection);
    });

    const collectionsInfoRaw = await alchemy.nft.getContractMetadataBatch(
      collections
    );

    const collectionsInfo = collectionsInfoRaw.map((collection, index) => ({
      contract: collections[index],
      totalSupply: collection.totalSupply || "0",
      name: collection.name || null,
      symbol: collection.symbol || null,
    }));

    return {
      props: { collectionsInfo },
    };
  } catch (err) {
    return {
      props: {
        collectionsInfo: [],
      },
    };
  }
};
