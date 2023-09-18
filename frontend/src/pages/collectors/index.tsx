import { httpClient } from "@/configs/axios.config";
import { EyeIcon } from "@/svgIcons";
import { shortenAddress } from "@/utils/functions";
import Link from "next/link";

interface IUser {
  _id: string | null;
  address?: string | null;
}

interface IProps {
  users: IUser[];
}

export default function Index({ users }: IProps) {
  if (users.length === 0) return <h2>Users Not found</h2>;
  return (
    <section className="container mx-auto mt-16 px-4">
      <h1 className="font-semibold text-xl tablet:text-2xl mb-10">
        Top Collections
      </h1>
      <div className="cards-grid">
        {users.map(({ _id, address }) => (
          <div
            key={_id}
            className="bg-[#fffff3] text-black inline-block py-4 px-2 rounded-md"
          >
            <div className="px-3">
              <Link
                href={`/profile/${address}`}
                className="hover:underline text-lg flex items-center justify-between"
              >
                <span>{shortenAddress(address as string)} </span>

                <EyeIcon className="h-6 w-6" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export const getServerSideProps = async () => {
  try {
    const { data: usersRaw } = await httpClient.get("/get-users");

    const users = usersRaw.map((user: IUser) => ({
      _id: user._id || null,
      address: user.address || null,
    }));

    return {
      props: {
        users,
      },
    };
  } catch (err) {
    console.log(err);

    return {
      props: {
        users: [],
      },
    };
  }
};
