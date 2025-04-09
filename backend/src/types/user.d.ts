export interface IUser {
  email: string;
  fullName: string;
  password: string;
  profilePic: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthenticatedUser {
  _id: string;
  fullName: string;
  email: string;
  profilePic: string;
  createdAt?: Date;
  updatedAt?: Date;
}
