import { useEffect, useState } from "react";
import { NextPageContext } from "next";
import Link from "next/link";
import { useAccount } from "wagmi";
import { alchemy } from "@/configs/alchemy.config";
import { extractCollectionInfo, shortenAddress } from "@/utils/functions";
import { OfferModal } from "@/components/collection/offerModal";
import { OffersHistoryTable } from "@/components/collection/offersHistoryTable";
import { RemoveOffer } from "@/components/collection/removeOffer";
import { EtherscanLink } from "@/components/etherscanLink";
import {
  OffersHistoryProvider,
  useOfferHistoryProvider,
} from "@/context/offersHistoryProvider";
import { collectionAvatar } from "@/utils/imgSrc";
import { ICollectionPageProps } from "@/types";

function NFTInfo({
  contract,
  image,
  title,
  symbol,
  name,
  description,
  owner,
}: ICollectionPageProps) {
  const { isConnected, address } = useAccount();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(true);
  const [isRejectOffer, setIsRejectOffer] = useState(false);

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  const { incluesFrom, offers } = useOfferHistoryProvider();
  useEffect(() => {
    if (address) {
      setIsOwner(owner?.toLocaleLowerCase() === address?.toLocaleLowerCase());

      setIsRejectOffer(incluesFrom(address).length > 0);
    }

    setIsWalletConnected(isConnected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, owner, offers.length, isConnected]);

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
                    <EtherscanLink path={`address/${contract}`} light>
                      {shortenAddress(contract)}
                    </EtherscanLink>
                    <Link
                      href={`/collection/${contract}`}
                      className="hover:underline transition-all"
                    >
                      {name}({symbol})
                    </Link>
                  </div>
                </h2>
              </div>
            </div>
            <span>
              {isWalletConnected && !isRejectOffer && !isOwner && (
                <button
                  className="py-1 px-10 text-black bg-white rounded-lg hover:bg-slate-200 transition-all"
                  onClick={() => setIsModalOpen(true)}
                >
                  <span className="flex items-center justify-center text-lg font-semibold">
                    Make Offer
                  </span>
                </button>
              )}

              {isWalletConnected && isRejectOffer && <RemoveOffer />}
            </span>

            {!isWalletConnected && (
              <h2 className="flex items-baseline italic text-xl">
                Connect wallet to make offers
              </h2>
            )}
          </div>
        </div>
      </section>

      <section className="mt-16">
        <OffersHistoryTable showOfferButton={isOwner} />
      </section>
    </>
  );
}

export default function PageWrapper(props: ICollectionPageProps) {
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
    const [metadata, { owners }] = await Promise.all([
      alchemy.nft.getNftMetadata(collection as string, tokenId as string),
      alchemy.nft.getOwnersForNft(collection as string, tokenId as string),
    ]);

    return {
      props: { ...extractCollectionInfo(metadata), owner: owners[0] },
    };
  } catch (err) {
    return {
      props: {
        ...defaultPlayload,
        owner: "",
      },
    };
  }
};
