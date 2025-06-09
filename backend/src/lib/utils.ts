import { Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const generateToken = (userId: string, res: Response) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
      ? parseInt(process.env.JWT_EXPIRES_IN)
      : "1h",
  });

  res.cookie(process.env.JWT_TOKEN_NAME || "chat_app_token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: process.env.JWT_EXPIRES_IN
      ? parseInt(process.env.JWT_EXPIRES_IN) * 1000
      : 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
  });

  return token;
};

export const isHalfExpired = (jwtPayload: JwtPayload): boolean => {
  const now = Math.floor(Date.now() / 1000);
  const expirationTime = jwtPayload.exp as number;
  const issuedAtTime = jwtPayload.iat as number;
  const halfLife = issuedAtTime + (expirationTime - issuedAtTime) / 2;
  return now >= halfLife;
};
