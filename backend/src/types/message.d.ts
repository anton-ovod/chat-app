import { Types } from "mongoose";

export interface IMessage {
  senderId: Types.ObjectId | string;
  receiverId: Types.ObjectId | string;
  conversationId: Types.ObjectId | string;
  text?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}
