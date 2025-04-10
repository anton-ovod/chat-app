import { ObjectId } from "mongoose";
import { AuthenticatedUser } from "./user";

export interface UpdateProfileRequestBody {
  fullName: string;
  email: string;
  profilePic: string;
}

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
declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}
