import { Server } from "socket.io";
import { UserSockets } from "@/types/socket";
import Conversation from "@/models/conversation.model";

const userSockets: UserSockets = {};

export const setupSocketServer = (io: Server) => {
  io.on("connection", (socket) => {
    console.log(`🟢 New client connected: ${socket.id}`);

    //TODO: Handle real-time events here
    let currentUserId: string | null = null;

    socket.on("login", async (userId: string) => {
      currentUserId = userId;

      if (!userSockets[currentUserId]) {
        userSockets[currentUserId] = new Set();
      }
      userSockets[currentUserId].add(socket.id);

      const conversations = await Conversation.find({
        participants: currentUserId,
      }).lean();

      const contacts = new Set<string>();
      conversations.forEach((conv) => {
        conv.participants.forEach((pid) => {
          if (pid.toString() !== currentUserId && userSockets[pid.toString()]) {
            contacts.add(pid.toString());
          }
        });
      });

      contacts.forEach((contactId) => {
        const contactSockets = userSockets[contactId];
        contactSockets.forEach((sid) => {
          io.to(sid).emit("userOnline", { userId: currentUserId });
        });
      });
    });

    socket.on("typing", ({ to }) => {
      const targetSockets = userSockets[to];
      if (targetSockets) {
        targetSockets.forEach((sid) => {
          io.to(sid).emit("typing", { from: currentUserId });
        });
      }
    });

    socket.on("stopTyping", ({ to }) => {
      const targetSockets = userSockets[to];
      if (targetSockets) {
        targetSockets.forEach((sid) => {
          io.to(sid).emit("stopTyping", { from: currentUserId });
        });
      }
    });

    const handleUserDisconnectOrLogout = async () => {
      if (!currentUserId) return;

      const userSocketsSet = userSockets[currentUserId];
      if (userSocketsSet) {
        userSocketsSet.delete(socket.id);

        if (userSocketsSet.size === 0) {
          delete userSockets[currentUserId];

          const conversations = await Conversation.find({
            participants: currentUserId,
          }).lean();

          const contacts = new Set<string>();
          conversations.forEach((conv) => {
            conv.participants.forEach((pid) => {
              if (
                pid.toString() !== currentUserId &&
                userSockets[pid.toString()]
              )
                contacts.add(pid.toString());
            });
          });

          contacts.forEach((contactId) => {
            const contactSockets = userSockets[contactId];
            contactSockets.forEach((sid) => {
              io.to(sid).emit("userOffline", { userId: currentUserId });
            });
          });
        }
      }
    };

    socket.on("logout", async () => {
      await handleUserDisconnectOrLogout();
      console.log(`🔴 Client logged out: ${socket.id}`);
    });

    socket.on("disconnect", async () => {
      await handleUserDisconnectOrLogout();
      console.log(`🔴 Client disconnected: ${socket.id}`);
    });
  });
};
