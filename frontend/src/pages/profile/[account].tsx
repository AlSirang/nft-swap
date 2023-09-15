import { ProfileContextProvider } from "@/context/profileContextProvider";
import { getAllCollections } from "@/core/getAllCollections";
import { IProfileContext } from "@/types";
import { Profile } from "@/views/profile";
import { NextPageContext } from "next";

export default function Page(props: IProfileContext) {
  return (
    <ProfileContextProvider>
      <Profile {...props} />
    </ProfileContextProvider>
  );
}

export const getServerSideProps = async (context: NextPageContext) => {
  const { account } = context.query;

  try {
    const { totalNFTs, collections, totalCollections } =
      await getAllCollections(account as string);

    return {
      props: { totalNFTs, collections, totalCollections, account },
    };
  } catch (err) {
    return {
      props: {
        totalNFTs: 0,
        collections: [],
        totalCollections: 0,
        account: null,
      },
    };
  }
};
