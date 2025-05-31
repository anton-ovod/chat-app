import { Server } from "socket.io";
import { setupSocketHandlers } from "./handlers";
import { UserSockets } from "../types/socket";

export const onlineUsers: UserSockets = {};

export const setupSocketServer = (httpServer: any) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_ORIGIN,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    setupSocketHandlers(io, socket, onlineUsers);
  });

  return io;
};
