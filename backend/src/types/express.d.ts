import { HydratedDocument, ObjectId } from "mongoose";
import { AuthenticatedUser, IUser } from "./user";

export interface MessageResponse {
  message: string;
}

export interface UserDetailsResponse {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  profilePic: string;
}

export interface UserConversationsResponse {
  conversations: {
    _id: string;
    fullName: string;
    username: string;
    profilePic: string;
  }[];
}

export interface ConversationDetailsResponse {
  _id: string;
  participants: {
    _id: string;
  }[];
}

export interface MessageDetailsResponse {
  _id: string;
  senderId: string;
  receiverId: string;
  text?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MessagesListResponse {
  messages: {
    _id: string;
    senderId: string;
    receiverId: string;
    text?: string;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}
declare global {
  namespace Express {
    interface Request {
      user: AuthenticatedUser;
    }
  }
}
