import "@/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";

import { connectDB } from "@/lib/db";
import authRoutes from "@/routes/auth.route";
import messageRoutes from "@/routes/message.route";
import userRoutes from "@/routes/user.route";
import conversationsRoutes from "./routes/conversation.routes";
import { Server } from "socket.io";
import { UserSockets } from "./types/socket";
import { SOCKET_EVENTS } from "./constants/socket.events";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN, credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/conversations", conversationsRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
    methods: ["GET", "POST"],
  },
});

const onlineUsers: UserSockets = {};

io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
  console.log("A user connected:", socket.id);

  socket.on(SOCKET_EVENTS.USER.ONLINE, (userId: string) => {
    if (!onlineUsers[userId]) {
      onlineUsers[userId] = new Set();
    }
    onlineUsers[userId].add(socket.id);

    io.emit(SOCKET_EVENTS.USERS.ONLINE, Object.keys(onlineUsers));
    console.log("Online users:", Object.keys(onlineUsers));
  });

  // socket.on(SOCKET_EVENTS.MESSAGE.SEND, (messageData) => {
  //   const recipientSockets = onlineUsers[messageData.receiverId];
  //   if (recipientSockets) {
  //     recipientSockets.forEach((recipientSocketId) => {
  //       io.to(recipientSocketId).emit(SOCKET_EVENTS.MESSAGE.RECEIVE, messageData);
  //     });
  //   }
  // });

  // socket.on(SOCKET_EVENTS.USER.TYPING, ({ senderId, receiverId, isTyping }) => {
  //   const recipientSockets = onlineUsers[receiverId];
  //   if (recipientSockets) {
  //     recipientSockets.forEach((recipientSocketId) => {
  //       io.to(recipientSocketId).emit(SOCKET_EVENTS.USER.TYPING, { senderId, isTyping });
  //     });
  //   }
  // });

  socket.on(SOCKET_EVENTS.DISCONNECT, () => {
    for (const userId in onlineUsers) {
      onlineUsers[userId].delete(socket.id);

      if (onlineUsers[userId].size === 0) {
        delete onlineUsers[userId];
      }
    }

    // Broadcast updated online users list to all clients
    io.emit(SOCKET_EVENTS.USERS.ONLINE, Object.keys(onlineUsers));
    console.log("User disconnected, online users:", Object.keys(onlineUsers));
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  connectDB();
});
