import { FC } from "react";

type ProfileHeaderProps = {
  title: string;
  subtitle: string;
};
const ProfileHeader: FC<ProfileHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="mt-2">{subtitle}</p>
    </div>
  );
};

export default ProfileHeader;
