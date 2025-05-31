import { Socket, Server } from "socket.io";
import { SOCKET_EVENTS } from "../constants/socket.events";
import { IMessage } from "../types/message";
import { UserSockets } from "../types/socket";

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

  socket.on(SOCKET_EVENTS.DISCONNECT, () => {
    for (const userId in onlineUsers) {
      onlineUsers[userId].delete(socket.id);
      if (onlineUsers[userId].size === 0) {
        delete onlineUsers[userId];
      }
    }

    io.emit(SOCKET_EVENTS.USERS.ONLINE, Object.keys(onlineUsers));
  });
};
