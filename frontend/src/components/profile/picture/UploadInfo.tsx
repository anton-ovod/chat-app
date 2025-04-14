import { FC } from "react";

type UploadInfoProps = {
  isUpdating: boolean;
};

const UploadInfo: FC<UploadInfoProps> = ({ isUpdating }) => (
  <p className="text-sm text-zinc-400">
    {isUpdating ? "Updating..." : "Click the camera icon to update your photo"}
  </p>
);

export default UploadInfo;
