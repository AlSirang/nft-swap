import dynamic from "next/dynamic";

const Profile = dynamic(() => import("@/components/profile/main"), {
  ssr: false,
});
export default Profile;
