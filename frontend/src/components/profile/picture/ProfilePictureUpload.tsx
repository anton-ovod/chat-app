import { FC } from "react";
import ProfilePic from "./ProfilePic";
import UploadOverlay from "./UploadOverlay";
import UploadInfo from "./UploadInfo";

const ProfilePictureUpload: FC = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <ProfilePic />
        <UploadOverlay />
      </div>

      <UploadInfo />
    </div>
  );
};

export default ProfilePictureUpload;
