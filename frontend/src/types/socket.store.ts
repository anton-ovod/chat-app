import { Socket } from "socket.io-client";
import { Message } from "./messages.store";
import {
  CondensedConversationDetails,
  ExtendedConversationDetails,
} from "./conversation.store";
import { AuthUser } from "./user";

export interface SocketStore {
  socket: Socket | null;
  onlineUsers: string[];
  initializeSocket: () => void;
  disconnectSocket: () => void;
  sendMessage: (message: Message) => void;
  updateMessage: (updateMessage: Message) => void;
  deleteMessage: (deletedMessage: Message) => void;
  createConversation: (conversation: ExtendedConversationDetails) => void;
  deleteConversation: (conversation: CondensedConversationDetails) => void;
  updateProfile: (updatedProfile: AuthUser) => void;
}
