import { Camera } from "lucide-react";
import { FC } from "react";
import { useProfileStore } from "../../../store/useProfileStore";

const UploadOverlay: FC = () => {
  const { isUpdatingProfile, setProfileData } = useProfileStore();

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result as string;
      setProfileData((prev) => ({ ...prev, profilePic: base64Image }));
    };
  };

  return (
    <label
      htmlFor="avatar-upload"
      className={`
      absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 
      rounded-full cursor-pointer transition-all duration-200
      ${isUpdatingProfile ? "cursor-not-allowed" : ""}
    `}
    >
      <Camera className="w-5 h-5 text-base-200" />
      <input
        type="file"
        id="avatar-upload"
        className="hidden"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={isUpdatingProfile}
      />
    </label>
  );
};

export default UploadOverlay;
