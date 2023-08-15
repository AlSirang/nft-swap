import Link from "next/link";

export const HomeMain = () => {
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
          <Link
            className="py-1 px-5 border-2 border-main text-lg rounded-lg hover:bg-main transition-all hover:border-main"
            href="/collection/address"
          >
            <span className="flex items-center justify-center text-md">
              Collection
            </span>
          </Link>
          <Link
            href="/collection/address/12"
            className="py-1 px-5 border-2 border-main text-lg rounded-lg hover:bg-main transition-all hover:border-main"
          >
            <span className="flex items-center justify-center text-md">
              View
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export const getServerSideProps = () => {
  try {
  } catch (err) {}
};
