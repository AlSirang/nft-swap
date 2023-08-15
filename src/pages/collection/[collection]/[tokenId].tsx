import { userAvatar, collectionAvatar } from "@/utils/imgSrc";
import Link from "next/link";

export default function NFTInfo() {
  return (
    <section className="grid grid-cols-12 gap-10 mt-20 max-w-6xl m-auto">
      <div className="col-span-12 tablet:col-span-6">
        <picture>
          <img
            className="max-h-[30rem] m-auto rounded-xl"
            src="https://i.seadn.io/gcs/files/579a81714964fa107c54217b901ef2c3.png?auto=format&dpr=1&w=1920"
            alt="img"
          />
        </picture>
      </div>
      <div className="col-span-12 tablet:col-span-6 text-center tablet:text-left">
        <h2 className="text-3xl mb-5">Image Name</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quasi
          neque laborum placeat quo obcaecati eligendi itaque ex nemo ad rem
          voluptate, modi, repellendus, sunt dignissimos at maiores in ut!
        </p>

        <div className="mt-10 flex gap-5">
          <Link href="/user/address">
            <span className="flex items-center text-lg gap-2">
              <picture>
                <img
                  className="relative inline-block h-10 w-10 rounded-lg object-cover object-center"
                  alt="user avatar"
                  src={userAvatar}
                />
              </picture>
              Owner
            </span>
          </Link>
        </div>

        <div className="mt-5">
          <h2 className="text-lg flex gap-2 items-center">
            <picture>
              <img
                className="relative inline-block h-10 w-10 rounded-lg object-cover object-center"
                alt="collection avatar"
                src={collectionAvatar}
              />
            </picture>
            Collection
          </h2>
        </div>

        <div className="mt-5">
          <button className="py-1 px-5 border-2 border-main text-lg rounded-lg hover:bg-main transition-all hover:border-main">
            Make Offer
          </button>
        </div>
      </div>
    </section>
  );
}
