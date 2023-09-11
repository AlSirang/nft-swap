import { getAllCollections } from "@/alchemy-core/getAllCollections";
import { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { IProfileContext } from "./types";

const ProfileContext = createContext<IProfileContext>({
  totalNFTs: 0,
  totalCollections: 0,
  collections: [],
});

export const ProfileContextProvider: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { address } = useAccount();
  const [state, setState] = useState<IProfileContext>({
    totalCollections: 0,
    totalNFTs: 0,
    collections: [],
  });

  useEffect(() => {
    if (address)
      getAllCollections(address).then((response) => {
        const { totalNFTs, collections, totalCollections } = response;

        setState((p) => ({
          ...p,
          totalNFTs,
          totalCollections,
          collections,
        }));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);
  return (
    <ProfileContext.Provider value={state}>{children}</ProfileContext.Provider>
  );
};

export const useProfileProvider = () => useContext(ProfileContext);
