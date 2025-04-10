import { ObjectId } from "mongoose";
import { AuthenticatedUser } from "./user";

export interface SignUpRequestBody {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

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
  email: string;
  profilePic: string;
}

export interface IRequestCookies {
  jwt: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
      cookies?: IRequestCookies;
    }
  }
}
