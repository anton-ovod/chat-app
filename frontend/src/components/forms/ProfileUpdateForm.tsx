import { Mail, User, UserCircle } from "lucide-react";
import { useProfileStore } from "../../store/useProfileStore";
import OutlineInputField from "./inputs/OutlineInputField";
import SubmitButton from "../buttons/SubmitButton";
import { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";

const ProfileUpdateForm = () => {
  const { profileData, setProfileData, isUpdatingProfile, updateProfile } =
    useProfileStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (authUser) {
      setProfileData(() => ({
        fullName: authUser.fullName,
        username: authUser.username,
        email: authUser.email,
        profilePic: authUser.profilePic,
      }));
    }
  }, [authUser, setProfileData]);

  const isIdenticalProfileData = () => {
    return (
      profileData.fullName === authUser?.fullName &&
      profileData.username === authUser?.username &&
      profileData.email === authUser?.email &&
      profileData.profilePic === authUser?.profilePic
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateProfile();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <OutlineInputField
        label="Full Name"
        type="text"
        value={profileData.fullName ?? ""}
        onChange={(e) =>
          setProfileData((prev) => ({
            ...prev,
            fullName: e.target.value,
          }))
        }
        icon={User}
      />

      <OutlineInputField
        label="Username"
        type="text"
        value={profileData.username ?? ""}
        onChange={(e) =>
          setProfileData((prev) => ({
            ...prev,
            username: e.target.value,
          }))
        }
        icon={UserCircle}
      />

      <OutlineInputField
        label="Email"
        type="email"
        value={profileData.email ?? ""}
        onChange={(e) =>
          setProfileData((prev) => ({
            ...prev,
            email: e.target.value,
          }))
        }
        icon={Mail}
      />

      <div className="text-right pt-4">
        <SubmitButton
          isProcessing={isUpdatingProfile}
          disabled={isIdenticalProfileData()}
          label="Save Changes"
        />
      </div>
    </form>
  );
};

export default ProfileUpdateForm;
