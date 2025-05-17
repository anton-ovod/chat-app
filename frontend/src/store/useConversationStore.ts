import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import {
  Conversation,
  ConversationRecipientsResponse,
  ConversationResponse,
  ConversationsResponse,
  ConversationStore,
} from "../types/conversation.store";

export const useConversationStore = create<ConversationStore>((set) => ({
  conversations: [],
  selectedConversation: null,
  isConversationsLoading: false,
  isSearchingRecipients: false,
  foundRecipients: [],

  createConversation: async (participantId: string) => {
    try {
      const response = await axiosInstance.post<ConversationResponse>(
        "/conversations",
        {
          participantId,
        }
      );
      const newConversation = response.data.conversation;
      set((state) => ({
        conversations: [...state.conversations, newConversation],
        selectedConversation: newConversation,
      }));
      toast.success(
        `Conversation with ${newConversation.receiver.fullName} started`
      );
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to start conversation"
      );
    }
  },
  deleteConversation: async (conversationId: string) => {
    try {
      await axiosInstance.delete(`/conversations/${conversationId}`);
      set((state) => ({
        conversations: state.conversations.filter(
          (conv) => conv._id !== conversationId
        ),
      }));
      toast.success("Conversation deleted");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to delete conversation"
      );
    }
  },
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
  setSelectedConversation: (conversation: Conversation | null) => {
    set({ selectedConversation: conversation });
  },
  getRecipientsByFullName: async (fullName: string) => {
    set({ isSearchingRecipients: true });
    try {
      const response = await axiosInstance.get<ConversationRecipientsResponse>(
        `/user/find/${fullName}`
      );
      set({ foundRecipients: response.data.users });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch recipients"
      );
    } finally {
      set({ isSearchingRecipients: false });
    }
  },
  clearFoundRecipients: () => set({ foundRecipients: [] }),
}));
