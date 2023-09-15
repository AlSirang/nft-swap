import { NextPageContext } from "next";
import { useEffect, useState } from "react";
import { EtherscanLink } from "@/components/etherscanLink";
import { alchemy } from "@/configs/alchemy.config";
import { extractCollectionInfo, shortenAddress } from "@/utils/functions";
import { ICollectionPageProps } from "@/types";

import { collectionAvatar } from "@/utils/imgSrc";
import { Card } from "@/components/card/main";

export default function Collection({
  nfts,
  pageKey,
}: {
  nfts: ICollectionPageProps[];
  pageKey: string | null;
}) {
  const [collectionInfo, setCollectionInfo] = useState<{
    name: string | undefined;
    symbol: string | undefined;
    contract: string | undefined;
  }>({
    name: "",
    symbol: "",
    contract: "",
  });

  useEffect(() => {
    if (nfts.length > 0) {
      const collection = nfts[0];
      setCollectionInfo({
        name: collection.name,
        symbol: collection.symbol,
        contract: collection.contract,
      });
    }
  }, [nfts]);

  if (nfts.length === 0) return <h2>Collection Not Found</h2>;

  return (
    <section className="container mx-auto mt-10 px-4 relative">
      <div className="relative flex flex-col min-w-0 break-words bg-[#fffff3] w-full mb-6 shadow-xl rounded-lg">
        <div className="px-6">
          <div className="w-full px-4 mx-auto mt-10 flex justify-center">
            <picture>
              <img
                alt="collection avatar"
                src={collectionAvatar}
                className="ring-2 ring-[#3f3e3e5e] ring-inset rounded-xl h-auto align-middle border-none w-[150px]"
              />
            </picture>
          </div>

          <div className="text-center mt-5 mb-4">
            <h2 className="text-black font-semibold text-xl mb-2">
              {collectionInfo.name}({collectionInfo.symbol})
            </h2>
            <div className="flex justify-center mb-3">
              <div className="flex justify-center">
                <EtherscanLink
                  className="text-black"
                  path={`address/${collectionInfo.contract}`}
                >
                  {shortenAddress(collectionInfo.contract)}
                </EtherscanLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="m-auto my-10" />

      <div className="cards-grid">
        {nfts?.map((nft, index) => (
          <Card key={index} {...nft} />
        ))}
      </div>
    </section>
  );
}

export const getServerSideProps = async (context: NextPageContext) => {
  const { collection, next } = context.query;

  try {
    const options = {
      pageSize: 10,
    };
    const { nfts, pageKey } = await alchemy.nft.getNftsForContract(
      collection as string,
      options
    );

    const payload = nfts.map((nft) => extractCollectionInfo(nft));
    return {
      props: { nfts: payload, pageKey: pageKey || null },
    };
  } catch (err) {
    return {
      props: {
        nfts: [],
        pageKey: null,
      },
    };
  }
};
