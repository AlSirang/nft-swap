import { createContext, useContext, useState } from "react";
import { IContext, IProfileContext } from "@/types";
import { IProfileState } from "@/types";

const ProfileContext = createContext<IProfileContext>({
  totalNFTs: 0,
  totalCollections: 0,
  collections: [],
  setProfileInfo: () => {},
});

export const ProfileContextProvider = ({ children }: IContext) => {
  const [profileInfo, setProfileInfo] = useState<IProfileState>({
    totalCollections: 0,
    totalNFTs: 0,
    collections: [],
  });

  return (
    <ProfileContext.Provider value={{ ...profileInfo, setProfileInfo }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileProvider = () => useContext(ProfileContext);
