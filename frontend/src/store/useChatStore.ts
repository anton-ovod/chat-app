import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: string;
}

interface ChatUser {
  _id: string;
  fullName: string;
  email: string;
  profilePic: string;
  createdAt: string;
  updatedAt: string;
}

interface ChatStore {
  messages: Message[];
  users: ChatUser[];
  selectedUser: ChatUser | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;

  getUsers: () => Promise<void>;
  getMessages: (userId: number) => Promise<void>;
  setSelectedUser: (user: ChatUser) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const response = await axiosInstance.get<ChatUser[]>("/message/users");
      set({ users: response.data });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId: number) => {
    set({ isMessagesLoading: true });
    try {
      const response = await axiosInstance.get<Message[]>(`/message/${userId}`);
      set({ messages: response.data });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  // TODO: optimize this later
  setSelectedUser: (user: ChatUser) => {
    set({ selectedUser: user });
  },
}));
