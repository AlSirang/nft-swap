import { useEffect } from "react";
import { Tab } from "@headlessui/react";
import { EtherscanLink } from "@/components/etherscanLink";
import { ProfileMeta } from "@/components/profile/meta";
import { Collections } from "@/components/profile/collections";
import { useProfileProvider } from "@/context/profileContextProvider";
import { shortenAddress } from "@/utils/functions";
import { profileAvatar } from "@/utils/imgSrc";
import { IProfileState } from "@/types";
import { OffersSent } from "@/components/profile/offersSent";

export const ProfileView = (props: IProfileState) => {
  const { account, collections, totalCollections, totalNFTs, offersSent } =
    props;

  const { setProfileInfo } = useProfileProvider();
  useEffect(() => {
    setProfileInfo({
      collections,
      totalCollections,
      totalNFTs,
      offersSent,
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
      <hr className="m-auto mt-10 mb-5" />
      <Tab.Group>
        <Tab.List className="flex gap-2 flex-wrap">
          <Tab className="bg-white hover:bg-slate-200 transition-all text-black px-10 py-1 font-medium rounded-md">
            NFTs
          </Tab>
          <Tab className="bg-white hover:bg-slate-200 transition-all text-black px-10 py-1 font-medium rounded-md">
            Offers Sent
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <Collections />
          </Tab.Panel>
          <Tab.Panel>
            <OffersSent />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </section>
  );
};
