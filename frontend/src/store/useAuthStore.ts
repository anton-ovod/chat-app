import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { AuthUser } from "../types/user";
import { AuthStore } from "../types/auth.store";
import { resetAllState } from "../utils/state.utils";

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,
  onlineUsers: [],

  checkAuth: async () => {
    set({ isCheckingAuth: true });
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
      resetAllState();
      toast.success("Logged out successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  },
  setAuthUser: (user) => {
    set({ authUser: user });
  },
}));
