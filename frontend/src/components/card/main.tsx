import { EyeIcon } from "@/svgIcons";
import { ICardProps } from "@/types";
import Link from "next/link";

export const Card = ({ title, image, contract, tokenId }: ICardProps) => {
  return (
    <section className="bg-[#fffff3] w-full sm:max-w-xs p-3.5 rounded-2xl bg-card-blue text-soft-blue text-lg font-normal shadow-xl">
      <div className="border-2 relative rounded-md overflow-hidden mb-3">
        <picture>
          <img src={image} alt="Equilibrium" />
        </picture>
      </div>

      <Link
        href={`/${contract}/${tokenId}`}
        className="flex justify-between items-center mb-2 text-black hover:text-gray-700 transition-all duration-300"
      >
        <span className="text-lg font-fredoka">{title}</span>
        <EyeIcon className="h-6 w-6" />
      </Link>
    </section>
  );
};
