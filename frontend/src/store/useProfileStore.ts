import { create } from "zustand";
import { ProfileStore } from "../types/profile.store";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";
import { isBase64Image } from "../utils/image.utils";
import { AuthUser } from "../types/user";
import { useSocketStore } from "./useSocketStore";

export const useProfileStore = create<ProfileStore>((set, get) => ({
  profileData: {},
  isUpdatingProfile: false,

  updateProfile: async () => {
    set({ isUpdatingProfile: true });
    try {
      const updatedProfileData = get().profileData;
      if (!isBase64Image(updatedProfileData.profilePic)) {
        updatedProfileData.profilePic = undefined;
      }
      const response = await axiosInstance.put<AuthUser>(
        "/user/update-profile",
        updatedProfileData
      );
      useSocketStore.getState().updateProfile(response.data);
      useAuthStore.getState().setAuthUser(response.data);
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  setProfileData: (updater) => {
    set((state) => ({
      profileData: updater(state.profileData),
    }));
  },
}));
