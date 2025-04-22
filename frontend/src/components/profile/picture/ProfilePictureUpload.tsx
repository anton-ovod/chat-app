import { FC, useEffect } from "react";
import ProfilePic from "./ProfilePic";
import UploadOverlay from "./UploadOverlay";
import UploadInfo from "./UploadInfo";
import { useProfileStore } from "../../../store/useProfileStore";
import { useAuthStore } from "../../../store/useAuthStore";

const ProfilePictureUpload: FC = () => {
  const { setProfileData } = useProfileStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (authUser?.profilePic) {
      setProfileData((prev) => ({ ...prev, profilePic: authUser.profilePic }));
    }
  }, [authUser?.profilePic]);

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
