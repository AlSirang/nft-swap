import { useAccount } from "wagmi";
import { useProfileProvider } from "@/context/profileContextProvider";
import { Card } from "../card/main";

export const Collections: React.FunctionComponent = () => {
  const { collections } = useProfileProvider();

  return (
    <section className="m-auto mt-10">
      <div className="cards-grid">
        {collections?.map((collection, index) => (
          <Card key={index} {...collection} />
        ))}
      </div>
    </section>
  );
};
