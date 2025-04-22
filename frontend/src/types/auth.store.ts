import { AuthUser } from "./user";

export interface AuthStore {
  authUser: AuthUser | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isCheckingAuth: boolean;
  onlineUsers: string[];
  checkAuth: () => Promise<void>;
  signup: (signup: SignupData) => Promise<void>;
  login: (loginData: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  setAuthUser: (user: AuthUser | null) => void;
}

export interface SignupData {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  username: string;
  password: string;
}
