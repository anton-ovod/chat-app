import { create } from "zustand";
import { ProfileStore } from "../types/profile.store";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useProfileStore = create<ProfileStore>((set, get) => ({
  profileData: {},
  isUpdatingProfile: false,

  updateProfile: async () => {
    set({ isUpdatingProfile: true });
    try {
      const response = await axiosInstance.put(
        "/user/update-profile",
        get().profileData
      );
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
