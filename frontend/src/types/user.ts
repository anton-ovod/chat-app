export interface AuthUser {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  profilePic: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConversationRecipient {
  _id: string;
  fullName: string;
  username: string;
  profilePic: string;
}
