import { FC } from "react";

type ProfilePicProps = {
  src?: string;
};

const ProfilePic: FC<ProfilePicProps> = ({ src }) => (
  <img
    src={src || "/avatar.png"}
    alt="Profile pic"
    className="size-32 rounded-full object-cover border-4"
  />
);

export default ProfilePic;
