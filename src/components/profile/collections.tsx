import { useAccount } from "wagmi";
import { useProfileProvider } from "@/context/profileContextProvider";
import { Card } from "../card/main";

export const Collections: React.FunctionComponent = () => {
  const { address } = useAccount();

  const { collections } = useProfileProvider();

  return (
    <section className="max-w-[110rem] m-auto mt-10 px-10">
      <h2 className="text-2xl font-semibold my-10 text-center">Collections</h2>

      <div className="flex gap-3 flex-wrap justify-stretch">
        {collections?.map((collection, index) => (
          <Card key={index} {...collection} />
        ))}
      </div>
    </section>
  );
};
