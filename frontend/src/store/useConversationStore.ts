import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import {
  Conversation,
  ConversationsResponse,
  ConversationStore,
  Message,
} from "../types/conversation.store";

export const useConversationStore = create<ConversationStore>((set) => ({
  messages: [],
  conversations: [],
  selectedConversation: null,
  isConversationsLoading: false,
  isMessagesLoading: false,

  getConversations: async () => {
    set({ isConversationsLoading: true });
    try {
      const response = await axiosInstance.get<ConversationsResponse>(
        "/conversations"
      );
      set({ conversations: response.data.conversations });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch conversations"
      );
    } finally {
      set({ isConversationsLoading: false });
    }
  },

  getMessages: async (username: string) => {
    set({ isMessagesLoading: true });
    try {
      const response = await axiosInstance.get<Message[]>(
        `/messages/${username}`
      );
      set({ messages: response.data });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  setSelectedConversation: (conversation: Conversation | null) => {
    set({ selectedConversation: conversation });
  },
}));
