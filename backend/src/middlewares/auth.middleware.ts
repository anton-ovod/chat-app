import jwt, { JwtPayload } from "jsonwebtoken";
import User from "@/models/user.model";
import { NextFunction, Request, Response } from "express";
import { MessageResponse } from "@/types/express";
import { HydratedDocument } from "mongoose";
import { IUser } from "@/types/user";

export const protectRoute = async (
  req: Request,
  res: Response<MessageResponse>,
  next: NextFunction
) => {
  try {
    const token: string = req.cookies.jwt;
    if (!token) {
      res.status(401).json({ message: "Unauthorized - No token provided" });
      return;
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    if (!decoded) {
      res.status(401).json({ message: "Unauthorized - Invalid token" });
      return;
    }

    const user: HydratedDocument<IUser> | null = await User.findById(
      decoded.userId
    ).select("-password");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    req.user = {
      _id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    next();
  } catch (error) {
    console.error("Error in protectRoute middleware: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
