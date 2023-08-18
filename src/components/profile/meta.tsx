import { useProfileProvider } from "@/providers/profileContextProvider";

export const ProfileMeta = () => {
  const { totalNFTs, totalCollections } = useProfileProvider();
  return (
    <div className="flex flex-wrap justify-center">
      <div className="w-full px-4">
        <div className="flex justify-center py-4 lg:pt-4 pt-8">
          <div className="mr-4 p-3 text-center">
            <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
              {totalNFTs}
            </span>
            <span className="text-sm text-gray-500">NFTs</span>
          </div>
          <div className="p-3 text-center">
            <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
              {totalCollections}
            </span>
            <span className="text-sm text-gray-500">Collections</span>
          </div>
        </div>
      </div>
    </div>
  );
};
