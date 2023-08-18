import { useAccount } from "wagmi";
import { profileAvatar } from "@/utils/imgSrc";
import { shortenAddress } from "@/utils/functions";
import { ProfileContextProvider } from "@/providers/profileContextProvider";
import { Collections } from "./collections";
import { ProfileMeta } from "./meta";

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
                  className="shadow-xl rounded-full h-auto align-middle border-none w-[150px]"
                />
              </picture>
            </div>

            <div className="text-center mt-5 mb-4">
              <div className="flex justify-center mb-3">
                <h2 className="text-xl text-black font-semibold">
                  {isConnected && shortenAddress(address)}
                </h2>
              </div>
              <ProfileMeta />
            </div>
          </div>
        </div>
      </section>

      <div className="px-10">
        <hr className="max-w-[105rem] m-auto mt-10" />
      </div>

      <Collections />
    </ProfileContextProvider>
  );
}
