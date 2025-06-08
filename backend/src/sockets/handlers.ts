import { Socket, Server } from "socket.io";
import { SOCKET_EVENTS } from "../constants/socket.events";
import { IMessage } from "../types/message";
import { UserSockets } from "../types/socket";
import {
  CondensedConversationDetails,
  ExtandedConversationDetails,
} from "@/types/conversation";
import { AuthenticatedUser } from "@/types/user";

export const setupSocketHandlers = (
  io: Server,
  socket: Socket,
  onlineUsers: UserSockets
) => {
  console.log("User connected:", socket.id);

  socket.on(SOCKET_EVENTS.USER.ONLINE, (userId: string) => {
    if (!onlineUsers[userId]) {
      onlineUsers[userId] = new Set();
    }
    onlineUsers[userId].add(socket.id);

    io.emit(SOCKET_EVENTS.USERS.ONLINE, Object.keys(onlineUsers));
  });

  socket.on(SOCKET_EVENTS.MESSAGE.SEND, (messageData: IMessage) => {
    const recipientSockets = onlineUsers[messageData.receiverId.toString()];
    if (recipientSockets) {
      recipientSockets.forEach((sid) => {
        io.to(sid).emit(SOCKET_EVENTS.MESSAGE.RECEIVE, messageData);
      });
    }
  });

  socket.on(SOCKET_EVENTS.MESSAGE.UPDATE, (updatedMessage: IMessage) => {
    const recipientSockets = onlineUsers[updatedMessage.receiverId.toString()];
    if (recipientSockets) {
      recipientSockets.forEach((sid) => {
        io.to(sid).emit(SOCKET_EVENTS.MESSAGE.UPDATED, updatedMessage);
      });
    }
  });

  socket.on(SOCKET_EVENTS.MESSAGE.DELETE, (deletedMessage: IMessage) => {
    const recipientSockets = onlineUsers[deletedMessage.receiverId.toString()];
    if (recipientSockets) {
      recipientSockets.forEach((sid) => {
        io.to(sid).emit(SOCKET_EVENTS.MESSAGE.DELETED, deletedMessage);
      });
    }
  });

  socket.on(
    SOCKET_EVENTS.CONVERSATION.CREATE,
    (createdConversation: ExtandedConversationDetails) => {
      const recipientSockets =
        onlineUsers[createdConversation.receiver._id.toString()];
      if (recipientSockets) {
        recipientSockets.forEach((sid) => {
          io.to(sid).emit(
            SOCKET_EVENTS.CONVERSATION.CREATED,
            createdConversation
          );
        });
      }
    }
  );

  socket.on(
    SOCKET_EVENTS.CONVERSATION.DELETE,
    (deletedConversation: CondensedConversationDetails) => {
      const recipientSockets =
        onlineUsers[deletedConversation.receiverId.toString()];
      if (recipientSockets) {
        recipientSockets.forEach((sid) => {
          io.to(sid).emit(
            SOCKET_EVENTS.CONVERSATION.DELETED,
            deletedConversation
          );
        });
      }
    }
  );

  socket.on(
    SOCKET_EVENTS.PROFILE.UPDATE,
    (updatedProfile: AuthenticatedUser) => {
      io.emit(SOCKET_EVENTS.PROFILE.UPDATED, updatedProfile);
    }
  );

  socket.on(SOCKET_EVENTS.DISCONNECT, () => {
    for (const userId in onlineUsers) {
      onlineUsers[userId].delete(socket.id);
      if (onlineUsers[userId].size === 0) {
        delete onlineUsers[userId];
      }
    }

    io.emit(SOCKET_EVENTS.USERS.ONLINE, Object.keys(onlineUsers));
    console.log("User disconnected:", socket.id);
  });
};
