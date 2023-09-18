import { NextPageContext } from "next";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { EtherscanLink } from "@/components/etherscanLink";
import { Card } from "@/components/card/main";
import { alchemy } from "@/configs/alchemy.config";
import { extractCollectionInfo, shortenAddress } from "@/utils/functions";
import { collectionAvatar } from "@/utils/imgSrc";
import { ICollectionInfo, ICollectionPage } from "@/types";

export default function Collection({ nfts, pageKey }: ICollectionPage) {
  const router = useRouter();
  const isComponentComputed = useRef(false);
  const [collectionInfo, setCollectionInfo] = useState<ICollectionInfo>({
    name: "",
    symbol: "",
    contract: "",
  });

  const lastLength = useRef(0);
  useEffect(() => {
    if (nfts.length > 0 && !isComponentComputed.current) {
      lastLength.current = nfts.length;
      isComponentComputed.current = true;

      const collection = nfts[0];
      setCollectionInfo({
        name: collection.name,
        symbol: collection.symbol,
        contract: collection.contract,
      });
    }
  }, [nfts]);

  if (nfts.length === 0) return <h2>Collection Not Found</h2>;

  const onNextPage = () => {
    try {
      const url = router.asPath.split("?")[0];

      router.push(`${url}?next=${pageKey}`);
    } catch (err) {
      console.log("onNextPageERR: ", err);
    }
  };

  return (
    <section className="container mx-auto mt-10 px-4 relative">
      <div className="relative flex flex-col min-w-0 break-words bg-[#fffff3] w-full mb-6 shadow-xl rounded-lg">
        <div className="px-6">
          <div className="w-full px-4 mx-auto mt-10 flex justify-center">
            <picture>
              <img
                alt="collection avatar"
                src={collectionAvatar}
                className="ring-2 ring-[#3f3e3e5e] rounded-xl h-auto align-middle border-none w-[150px]"
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

      <div>{pageKey && <button onClick={onNextPage}>Next Page</button>}</div>
    </section>
  );
}

export const getServerSideProps = async (context: NextPageContext) => {
  const { collection, next } = context.query;

  try {
    const options: { pageSize: number; pageKey?: string | undefined } = {
      pageSize: 10,
    };

    if (next) options.pageKey = next as string;
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
