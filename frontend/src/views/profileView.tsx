import { useEffect } from "react";
import { EtherscanLink } from "@/components/etherscanLink";
import { ProfileMeta } from "@/components/profile/meta";
import { Collections } from "@/components/profile/collections";
import { useProfileProvider } from "@/context/profileContextProvider";
import { shortenAddress } from "@/utils/functions";
import { profileAvatar } from "@/utils/imgSrc";
import { IProfileContext } from "@/types";

export const ProfileView = (props: IProfileContext) => {
  const { account, collections, totalCollections, totalNFTs } = props;

  const { setProfileInfo } = useProfileProvider();
  useEffect(() => {
    setProfileInfo({
      collections,
      totalCollections,
      totalNFTs,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collections, totalCollections, totalNFTs]);
  return (
    <section className="container mx-auto mt-10 px-4 relative">
      <div className="relative flex flex-col min-w-0 break-words bg-[#fffff3] w-full mb-6 shadow-xl rounded-lg">
        <div className="px-6">
          <div className="w-full px-4 mx-auto mt-10 flex justify-center">
            <picture>
              <img
                alt="profile avatar"
                src={profileAvatar}
                className="ring-2 ring-[#3f3e3e5e] ring-inset rounded-xl h-auto align-middle border-none w-[150px]"
              />
            </picture>
          </div>

          <div className="text-center mt-5 mb-4">
            <div className="flex justify-center mb-3">
              <div className="flex justify-center">
                <EtherscanLink
                  className="text-black"
                  path={`address/${account}`}
                >
                  {shortenAddress(account)}
                </EtherscanLink>
              </div>
            </div>
            <ProfileMeta />
          </div>
        </div>
      </div>
      <hr className="m-auto mt-10" />

      <Collections />
    </section>
  );
};
