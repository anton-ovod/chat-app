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
import { useSocketStore } from "./useSocketStore";
import { useAuthStore } from "./useAuthStore";
import { DEFAULT_PAGE_SIZE } from "../constants";

export const useConversationStore = create<ConversationStore>((set, get) => ({
  conversations: [],
  selectedConversation: null,
  isConversationsLoading: false,
  isSearchingRecipients: false,
  foundRecipients: [],
  foundRecipientsPagination: undefined,
  paginationInfo: undefined,
  foundRecipientsSearchTerm: "",

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
      const { authUser } = useAuthStore.getState();
      useSocketStore.getState().createConversation({
        ...newConversation,
        initiator: {
          _id: authUser!._id,
          fullName: authUser!.fullName,
          username: authUser!.username,
          profilePic: authUser!.profilePic,
        },
      });
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
      useSocketStore.getState().deleteConversation({
        _id: conversationId,
        receiverId: get().selectedConversation!.receiver._id,
      });
      set((state) => ({
        conversations: state.conversations.filter(
          (conv) => conv._id !== conversationId
        ),
        selectedConversation: null,
      }));
      toast.success("Conversation deleted");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to delete conversation"
      );
    }
  },
  getConversations: async (page = 1, pageSize = DEFAULT_PAGE_SIZE) => {
    set({ isConversationsLoading: true });
    try {
      const response = await axiosInstance.get<ConversationsResponse>(
        `/conversations?page=${page}&pageSize=${pageSize}`
      );
      set({
        conversations: response.data.conversations,
        paginationInfo: response.data.paginationInfo,
      });
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
  getRecipientsByFullName: async (page = 1, pageSize = DEFAULT_PAGE_SIZE) => {
    set({ isSearchingRecipients: true });
    const searchTerm = get().foundRecipientsSearchTerm;
    try {
      const response = await axiosInstance.get<ConversationRecipientsResponse>(
        `/user/find/${searchTerm}?page=${page}&pageSize=${pageSize}`
      );
      set({
        foundRecipients: response.data.users,
        foundRecipientsPagination: response.data.paginationInfo,
      });
    } catch (error: any) {
      console.error("Error fetching recipients:", error);
    } finally {
      set({ isSearchingRecipients: false });
    }
  },
  setFoundRecipientsSearchTerm: (searchTerm: string) =>
    set({ foundRecipientsSearchTerm: searchTerm }),
  clearFoundRecipients: () => set({ foundRecipients: [] }),
}));
