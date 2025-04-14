import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Loader2, Mail, User, UserCircle } from "lucide-react";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfilePictureUpload from "../components/profile/picture/ProfilePictureUpload";
import SubmitButton from "../components/buttons/SubmitButton";
import InputFieldWithIcon from "../components/forms/inputs/InputFieldWithIcon";
import OutlineInputField from "../components/forms/inputs/OutlineInputField";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [userProfileData, setUserProfileData] = useState({
    fullName: authUser!.fullName,
    username: authUser!.username,
    email: authUser!.email,
    profilePic: authUser?.profilePic,
  });

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result as string;
      setUserProfileData({ ...userProfileData, profilePic: base64Image });
    };
  };

  const handleUpdateProfile = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Updating profile with data:", userProfileData);
    if (userProfileData.profilePic?.startsWith("http")) {
      setUserProfileData({ ...userProfileData, profilePic: undefined });
    }
    await updateProfile(userProfileData);
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <ProfileHeader title="Profile" subtitle="Your profile information" />

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <ProfilePictureUpload
                profilePicUrl={userProfileData.profilePic}
                isUpdating={isUpdatingProfile}
                onUpload={handleImageUpload}
              />
            </div>
          </div>

          {/* Profile Information Section */}
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <OutlineInputField
              label="Full Name"
              type="text"
              value={userProfileData.fullName}
              onChange={(e) =>
                setUserProfileData({
                  ...userProfileData,
                  fullName: e.target.value,
                })
              }
              icon={User}
            />

            <OutlineInputField
              label="Username"
              type="text"
              value={userProfileData.username}
              onChange={(e) =>
                setUserProfileData({
                  ...userProfileData,
                  username: e.target.value,
                })
              }
              icon={UserCircle}
            />

            <OutlineInputField
              label="Email"
              type="email"
              value={userProfileData.email}
              onChange={(e) =>
                setUserProfileData({
                  ...userProfileData,
                  email: e.target.value,
                })
              }
              icon={Mail}
            />

            {/* <div className="space-y-1.5">
              <label
                htmlFor="fullName"
                className="text-sm text-zinc-400 flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={userProfileData.fullName}
                onChange={(e) =>
                  setUserProfileData({
                    ...userProfileData,
                    fullName: e.target.value,
                  })
                }
                className="px-4 py-2.5 bg-base-200 rounded-lg border w-full"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="username"
                className="text-sm text-zinc-400 flex items-center gap-2"
              >
                <UserCircle className="w-4 h-4" />
                Username
              </label>
              <input
                id="username"
                type="text"
                value={userProfileData.username}
                onChange={(e) =>
                  setUserProfileData({
                    ...userProfileData,
                    username: e.target.value,
                  })
                }
                className="px-4 py-2.5 bg-base-200 rounded-lg border w-full"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-sm text-zinc-400 flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={userProfileData.email}
                onChange={(e) =>
                  setUserProfileData({
                    ...userProfileData,
                    email: e.target.value,
                  })
                }
                className="px-4 py-2.5 bg-base-200 rounded-lg border w-full"
              />
            </div> */}

            <div className="text-right pt-4">
              <SubmitButton
                isProcessing={isUpdatingProfile}
                label="Save Changes"
              />
            </div>
          </form>

          {/* Account Information Section */}
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser!.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
