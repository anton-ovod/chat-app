import { FC } from "react";
import ProfilePic from "./ProfilePic";
import UploadOverlay from "./UploadOverlay";
import UploadInfo from "./UploadInfo";

type ProfilePictureUploadProps = {
  profilePicUrl?: string;
  isUpdating: boolean;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ProfilePictureUpload: FC<ProfilePictureUploadProps> = ({
  profilePicUrl,
  isUpdating,
  onUpload,
}) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <ProfilePic src={profilePicUrl} />
        <UploadOverlay isDisabled={isUpdating} onUpload={onUpload} />
      </div>

      <UploadInfo isUpdating={isUpdating} />
    </div>
  );
};

export default ProfilePictureUpload;
