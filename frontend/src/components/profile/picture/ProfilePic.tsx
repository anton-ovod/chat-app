import { FC } from "react";
import { useProfileStore } from "../../../store/useProfileStore";

const ProfilePic: FC = () => {
  const { profileData } = useProfileStore();
  return (
    <img
      src={profileData.profilePic || "/avatar.png"}
      alt="Profile pic"
      className="size-32 rounded-full object-cover border-4"
    />
  );
};

export default ProfilePic;
