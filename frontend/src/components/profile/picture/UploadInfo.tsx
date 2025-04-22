import { FC } from "react";
import { useProfileStore } from "../../../store/useProfileStore";

const UploadInfo: FC = () => {
  const { isUpdatingProfile } = useProfileStore();
  return (
    <p className="text-sm text-zinc-400">
      {isUpdatingProfile
        ? "Updating..."
        : "Click the camera icon to update your photo"}
    </p>
  );
};

export default UploadInfo;
