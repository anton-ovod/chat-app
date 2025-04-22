import ProfileHeader from "../components/profile/ProfileHeader";
import ProfilePictureUpload from "../components/profile/picture/ProfilePictureUpload";
import ProfileUpdateForm from "../components/forms/ProfileUpdateForm";
import AccountInfo from "../components/profile/AccountInfo";
const ProfilePage = () => {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <ProfileHeader title="Profile" subtitle="Your profile information" />

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <ProfilePictureUpload />
            </div>
          </div>

          <ProfileUpdateForm />

          <AccountInfo />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
