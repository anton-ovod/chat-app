import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { useAuthStore } from "./useAuthStore";

interface SocketStore {
  socket: Socket | null;
  onlineUsers: string[];
  initializeSocket: () => void;
  disconnectSocket: () => void;
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
}));
