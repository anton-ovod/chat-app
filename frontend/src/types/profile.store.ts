export interface ProfileStore {
  profileData: ProfileData;
  isUpdatingProfile: boolean;
  setProfileData: (updater: (prev: ProfileData) => ProfileData) => void;
  updateProfile: () => Promise<void>;
}

export interface ProfileData {
  fullName?: string;
  username?: string;
  email?: string;
  profilePic?: string;
}
