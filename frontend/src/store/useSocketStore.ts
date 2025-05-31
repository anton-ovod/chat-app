import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { useAuthStore } from "./useAuthStore";
import { useMessagesStore } from "./useMessagesStore";
import { Message } from "../types/messages.store";
import { useConversationStore } from "./useConversationStore";

interface SocketStore {
  socket: Socket | null;
  onlineUsers: string[];
  initializeSocket: () => void;
  disconnectSocket: () => void;
  sendMessage: (message: Message) => void;
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
    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    set({ socket });
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
