import { HydratedDocument } from "mongoose";
import { IUser } from "./user";

export interface IConversation {
  participants: HydratedDocument<IUser>[];
  createdAt?: Date;
  updatedAt?: Date;
}
