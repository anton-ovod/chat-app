import { HydratedDocument, ObjectId } from "mongoose";
import { AuthenticatedUser, IUser } from "./user";
import e from "express";
import { ConversationDetails } from "./conversation";

export interface MessageResponse {
  message: string;
}

export interface UserConversationsResponse {
  conversations: {
    _id: string;
    receiver: {
      fullName: string;
      username: string;
      profilePic: string;
    };
  }[];
}

export interface ConversationDetailsResponse {
  conversation: ConversationDetails;
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

export interface FoundUsersListResponse {
  users: {
    _id: string;
    fullName: string;
    username: string;
    profilePic: string;
  }[];
}
declare global {
  namespace Express {
    interface Request {
      user: AuthenticatedUser;
    }
  }
}
