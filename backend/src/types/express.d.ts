import { HydratedDocument, ObjectId } from "mongoose";
import { AuthenticatedUser, IUser } from "./user";
import e from "express";
import { ConversationDetails } from "./conversation";
import {
  LimitBasedPaginationQueryParams,
  PageBasedPaginationQueryParams,
} from "@/schemas/pagination.scheme";

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
  paginationInfo: PaginationInfo;
}
export interface PaginationInfo {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

export interface CursorPaginationInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextCursor?: string;
  previousCursor?: string;
  limit?: number;
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
  paginationInfo: CursorPaginationInfo;
}

export interface FoundUsersListResponse {
  users: {
    _id: string;
    fullName: string;
    username: string;
    profilePic: string;
  }[];
  paginationInfo: PaginationInfo;
}

export type ValidatedQueryType =
  | PageBasedPaginationQueryParams
  | LimitBasedPaginationQueryParams
  | any;
declare global {
  namespace Express {
    interface Request {
      user: AuthenticatedUser;
      validatedQuery: ValidatedQueryType;
    }
  }
}
