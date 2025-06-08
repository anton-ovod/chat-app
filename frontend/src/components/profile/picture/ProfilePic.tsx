import { FC } from "react";
import { useProfileStore } from "../../../store/useProfileStore";

const ProfilePic: FC = () => {
  const { profilePic } = useProfileStore((state) => state.profileData);
  return (
    <img
      src={profilePic || "/avatar.png"}
      alt="Profile pic"
      className="size-32 rounded-full object-cover border-4"
    />
  );
};

export default ProfilePic;
