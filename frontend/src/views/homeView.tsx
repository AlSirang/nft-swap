import { ICardProps } from "@/types";
import { collectionAvatar } from "@/utils/imgSrc";
import Link from "next/link";

export const HomeView: React.FunctionComponent<ICardProps> = ({
  image,
  title,
  contract,
  tokenId,
  description,
  name,
  symbol,
}) => {
  return (
    <section className="grid grid-cols-12 tablet:gap-10 mt-20 max-w-6xl m-auto">
      <div className="col-span-12 tablet:col-span-6">
        <div className="bg-[#fffff3] m-auto w-[80%] p-3.5 rounded-2xl bg-card-blue text-soft-blue text-lg font-normal shadow-xl">
          <picture>
            <img
              className="max-h-[30rem] m-auto rounded-xl"
              src={image}
              alt="img"
            />
          </picture>
        </div>
      </div>

      <div className="col-span-12 tablet:col-span-6 text-center tablet:text-left py-10">
        <div className="flex flex-col justify-between h-full gap-5">
          <div>
            <h2 className="text-3xl mb-5">{title}</h2>
            <p>{description}</p>
          </div>

          <div className="mt-5 flex gap-5 items-center justify-center tablet:justify-normal">
            <div className="text-lg flex gap-2 items-center">
              <picture>
                <img
                  className="relative inline-block h-12 w-12 rounded-xl object-cover object-center"
                  alt="collection avatar"
                  src={collectionAvatar}
                />
              </picture>

              <div className="text-left">
                <h2 className="font-semibold">Collection</h2>
                <p>
                  {name}({symbol})
                </p>
              </div>
            </div>

            <Link
              href={`/${contract}/${tokenId}`}
              className="py-1 px-10 text-black bg-white rounded-lg hover:bg-slate-200 transition-all block"
            >
              <span className="flex items-center justify-center text-lg font-semibold">
                View
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
