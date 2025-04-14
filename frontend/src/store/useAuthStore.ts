import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

interface AuthUser {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  profilePic: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthStore {
  authUser: AuthUser | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  onlineUsers: string[];
  checkAuth: () => Promise<void>;
  signup: (signup: SignupData) => Promise<void>;
  login: (loginData: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profileData: ProfileUpdateData) => Promise<void>;
}

interface SignupData {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  username: string;
  password: string;
}

interface ProfileUpdateData {
  fullName?: string;
  username?: string;
  email?: string;
  profilePic?: string;
}

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get<AuthUser>("/auth/check");
      set({ authUser: response.data });
    } catch (error: any) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (signUpData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", signUpData);
      set({ authUser: res.data });
      toast.success("Account created successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (loginData) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", loginData);
      set({ authUser: response.data });
      toast.success("Logged in successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  },
  updateProfile: async (profileData) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await axiosInstance.put(
        "/user/update-profile",
        profileData
      );
      set({ authUser: response.data });
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
