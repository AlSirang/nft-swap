import { useProfileProvider } from "@/context/profileContextProvider";
import { OffersTable } from "../offersTable";

export const OffersSent = () => {
  const { offersSent } = useProfileProvider();

  return (
    <section className="mt-5">
      {offersSent.length === 0 && <h2>No Offers Activity Found</h2>}
      {offersSent.length > 0 && <OffersTable offers={offersSent} />}
    </section>
  );
};
