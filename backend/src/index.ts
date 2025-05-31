// main.ts
import "@/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { connectDB } from "@/lib/db";
import { setupSocketServer } from "@/sockets/server";
import authRoutes from "@/routes/auth.route";
import messageRoutes from "@/routes/message.route";
import userRoutes from "@/routes/user.route";
import conversationsRoutes from "@/routes/conversation.routes";

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
setupSocketServer(server);

server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  connectDB();
});
