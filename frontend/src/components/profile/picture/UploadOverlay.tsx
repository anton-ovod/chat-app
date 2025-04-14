import { Camera } from "lucide-react";
import { FC } from "react";

type UploadOverlayProps = {
  isDisabled: boolean;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const UploadOverlay: FC<UploadOverlayProps> = ({ isDisabled, onUpload }) => (
  <label
    htmlFor="avatar-upload"
    className={`
      absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 
      rounded-full cursor-pointer transition-all duration-200
      ${isDisabled ? "cursor-not-allowed" : ""}
    `}
  >
    <Camera className="w-5 h-5 text-base-200" />
    <input
      type="file"
      id="avatar-upload"
      className="hidden"
      accept="image/*"
      onChange={onUpload}
      disabled={isDisabled}
    />
  </label>
);

export default UploadOverlay;
