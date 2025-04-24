import { create } from "zustand";
import {
  Message,
  MessagesResponse,
  MessagesStore,
} from "../types/messages.store";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useMessagesStore = create<MessagesStore>((set, get) => ({
  messages: [],
  messageContent: {
    text: "",
    image: "",
  },
  isMessagesLoading: false,
  isMessageSending: false,
  getMessages: async (username: string) => {
    set({ isMessagesLoading: true });
    try {
      const response = await axiosInstance.get<MessagesResponse>(
        `/messages/${username}`
      );
      set({ messages: response.data.messages });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (username) => {
    set({ isMessageSending: true });
    try {
      const { messages, messageContent } = get();
      const response = await axiosInstance.post<Message>(
        `/messages/send/${username}`,
        messageContent
      );
      set({ messages: [...messages, response.data] });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to send message");
    } finally {
      set({ isMessageSending: false });
    }
  },
  editMessage: async (messageId, content) => {
    try {
      const { messages } = get();
      const response = await axiosInstance.put<Message>(
        `/messages/edit/${messageId}`,
        content
      );
      const updatedMessages = messages.map((message) => {
        if (message._id === messageId) return { ...message, ...response.data };
        return message;
      });
      set({ messages: updatedMessages });
      toast.success("Message edited successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to edit message");
    }
  },
  deleteMessage: async (messageId) => {
    try {
      const { messages } = get();
      const response = await axiosInstance.delete<Message>(
        `/messages/delete/${messageId}`
      );
      const updatedMessages = messages.filter(
        (message) => message._id !== response.data._id
      );
      set({ messages: updatedMessages });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete message");
    }
  },
  setMessageContent: (updater) => {
    set((state) => ({
      messageContent: updater(state.messageContent),
    }));
  },
  resetMessageContent: () => {
    set({
      messageContent: {
        text: "",
        image: "",
      },
    });
  },
}));
