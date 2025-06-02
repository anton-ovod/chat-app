import { HydratedDocument } from "mongoose";
import { IUser } from "./user";

export interface IConversation {
  participants: HydratedDocument<IUser>[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ConversationDetails {
  _id: string;
  receiver: {
    _id: string;
    fullName: string;
    username: string;
    profilePic: string;
  };
}

export interface ExtandedConversationDetails extends ConversationDetails {
  initiator: {
    _id: string;
    fullName: string;
    username: string;
    profilePic: string;
  };
}

export interface CondensedConversationDetails {
  _id: string;
  receiverId: string;
}
