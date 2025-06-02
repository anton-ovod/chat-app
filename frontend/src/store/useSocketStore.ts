import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { useAuthStore } from "./useAuthStore";
import { useMessagesStore } from "./useMessagesStore";
import { Message } from "../types/messages.store";
import { useConversationStore } from "./useConversationStore";
import {
  CondensedConversationDetails,
  ExtendedConversationDetails,
} from "../types/conversation.store";

interface SocketStore {
  socket: Socket | null;
  onlineUsers: string[];
  initializeSocket: () => void;
  disconnectSocket: () => void;
  sendMessage: (message: Message) => void;
  updateMessage: (updateMessage: Message) => void;
  deleteMessage: (deletedMessage: Message) => void;
  createConversation: (conversation: ExtendedConversationDetails) => void;
  deleteConversation: (conversation: CondensedConversationDetails) => void;
}

export const useSocketStore = create<SocketStore>((set, get) => ({
  socket: null,
  onlineUsers: [],

  initializeSocket: () => {
    const socket = io("http://localhost:3000", {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("Socket connected");
      const authUser = useAuthStore.getState().authUser;
      if (authUser) {
        socket.emit("user:online", authUser._id);
      }
    });

    socket.on("users:online", (users: string[]) => {
      set({ onlineUsers: users });
    });

    socket.on("message:receive", (message: Message) => {
      const { messages } = useMessagesStore.getState();
      const { selectedConversation } = useConversationStore.getState();

      if (
        selectedConversation &&
        (message.senderId === selectedConversation.receiver._id ||
          message.receiverId === selectedConversation.receiver._id)
      ) {
        useMessagesStore.setState({ messages: [...messages, message] });
      } else {
        console.log("Received message from non-active conversation", message);
      }
    });

    socket.on("message:updated", (updatedMessage: Message) => {
      const { messages } = useMessagesStore.getState();
      const updatedMessages = messages.map((msg) =>
        msg._id === updatedMessage._id ? updatedMessage : msg
      );
      useMessagesStore.setState({ messages: updatedMessages });
    });

    socket.on("message:deleted", (deletedMessage: Message) => {
      const { messages } = useMessagesStore.getState();
      const updatedMessages = messages.filter(
        (msg) => msg._id !== deletedMessage._id
      );
      useMessagesStore.setState({ messages: updatedMessages });
    });

    socket.on(
      "conversation:created",
      (newConversation: ExtendedConversationDetails) => {
        const { conversations } = useConversationStore.getState();
        useConversationStore.setState({
          conversations: [...conversations, newConversation],
        });
      }
    );

    socket.on(
      "conversation:deleted",
      (deletedConversation: CondensedConversationDetails) => {
        const { conversations, selectedConversation } =
          useConversationStore.getState();
        const updatedConversations = conversations.filter(
          (conv) => conv._id !== deletedConversation._id
        );
        useConversationStore.setState({
          conversations: updatedConversations,
          selectedConversation:
            selectedConversation?._id === deletedConversation._id
              ? null
              : selectedConversation,
        });
      }
    );

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    set({ socket });
  },

  updateMessage: (updateMessage: Message) => {
    const { socket } = get();
    if (socket) {
      socket.emit("message:update", updateMessage);
    }
  },

  deleteMessage: (deletedMessage: Message) => {
    const { socket } = get();
    if (socket) {
      socket.emit("message:delete", deletedMessage);
    }
  },

  createConversation: (conversation: ExtendedConversationDetails) => {
    const { socket } = get();
    if (socket) {
      socket.emit("conversation:create", conversation);
    }
  },

  deleteConversation: (conversation: CondensedConversationDetails) => {
    const { socket } = get();
    if (socket) {
      socket.emit("conversation:delete", conversation);
    }
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },

  sendMessage: (message: Message) => {
    const { socket } = get();
    if (socket) {
      socket.emit("message:send", message);
    }
  },
}));
