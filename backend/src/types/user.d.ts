export interface IUser {
  email: string;
  fullName: string;
  username: string;
  password: string;
  profilePic: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthenticatedUser {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  profilePic: string;
  createdAt: Date;
  updatedAt: Date;
}
