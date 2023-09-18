import { useProfileProvider } from "@/context/profileContextProvider";
import { OffersTable } from "../offersTable";

export const OffersSent = () => {
  const { offersSent } = useProfileProvider();

  if (offersSent.length === 0) return <h2>No Offers Activity Found</h2>;

  return (
    <section className="mt-5">
      <OffersTable offers={offersSent} />
    </section>
  );
};
