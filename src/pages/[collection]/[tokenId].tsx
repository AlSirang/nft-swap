import { useState } from "react";
import { NextPageContext } from "next";
import { alchemy } from "@/configs/alchemy.config";
import { ICollectionPageProps } from "@/types";
import { extractCollectionInfo } from "@/utils/functions";
import { collectionAvatar } from "@/utils/imgSrc";
import { OfferModal } from "@/components/collection/offerModal";

export default function NFTInfo({
  image,
  title,
  symbol,
  name,
  description,
}: ICollectionPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onModalClose = () => {
    setIsModalOpen(false);
  };

  const onMakeOffer = () => {};

  return (
    <>
      <OfferModal isOpen={isModalOpen} onClose={onModalClose} />
      <section className="grid grid-cols-12 tablet:gap-10 mt-20 max-w-6xl m-auto">
        <div className="col-span-12 tablet:col-span-6">
          <section className="bg-[#fffff3] m-auto w-[80%] p-3.5 rounded-2xl bg-card-blue text-soft-blue text-lg font-normal shadow-xl">
            <picture>
              <img
                className="max-h-[30rem] m-auto rounded-xl"
                src={image}
                alt="img"
              />
            </picture>
          </section>
        </div>
        <div className="col-span-12 tablet:col-span-6 text-center tablet:text-left  py-10">
          <div className="flex flex-col justify-between h-full gap-5">
            <div>
              <h2 className="text-3xl mb-5">{title}</h2>
              <p>{description}</p>
            </div>
            <div className="mt-5 flex gap-5 items-center justify-center tablet:justify-normal">
              <div>
                <h2 className="text-lg flex gap-2 items-center">
                  <picture>
                    <img
                      className="relative inline-block h-12 w-12 rounded-xl object-cover object-center"
                      alt="collection avatar"
                      src={collectionAvatar}
                    />
                  </picture>

                  <div>
                    <h2 className="font-semibold">Collection</h2>
                    <p>
                      {name}({symbol})
                    </p>
                  </div>
                </h2>
              </div>
              <span>
                <button
                  className="py-1 px-10 text-black bg-white rounded-lg hover:bg-slate-200 transition-all"
                  onClick={() => setIsModalOpen(true)}
                >
                  <span className="flex items-center justify-center text-lg font-semibold">
                    Make Offer
                  </span>
                </button>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
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
    const results = await alchemy.nft.getNftMetadata(
      collection as string,
      tokenId as string
    );

    return {
      props: extractCollectionInfo(results),
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
