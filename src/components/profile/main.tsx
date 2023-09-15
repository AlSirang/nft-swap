import { useAccount } from "wagmi";
import { profileAvatar } from "@/utils/imgSrc";
import { shortenAddress } from "@/utils/functions";
import { ProfileContextProvider } from "@/context/profileContextProvider";
import { Collections } from "./collections";
import { ProfileMeta } from "./meta";
import { EtherscanLink } from "../etherscanLink";

export default function Profile() {
  const { isConnected, address } = useAccount();
  return (
    <ProfileContextProvider>
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
                    path={`address/${address}`}
                  >
                    {isConnected && shortenAddress(address)}
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
    </ProfileContextProvider>
  );
}
