import { ICardProps } from "@/types";
import Link from "next/link";

export const Card = ({ title, image, contract, tokenId }: ICardProps) => {
  return (
    <section className="bg-[#fffff3] w-full sm:max-w-xs p-3.5 rounded-2xl bg-card-blue text-soft-blue text-lg font-normal shadow-xl">
      <div className="border-2 relative rounded-md overflow-hidden mb-6">
        <picture>
          <img src={image} alt="Equilibrium" />
        </picture>
      </div>

      <h1 className="text-2xl font-semibold mb-4">
        <Link
          href={`/${contract}/${tokenId}`}
          className="text-black hover:text-gray-800 transition-colors duration-1000"
        >
          {title}
        </Link>
      </h1>
    </section>
  );
};
