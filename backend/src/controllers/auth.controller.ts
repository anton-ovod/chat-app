import "@/config";
import { Request, Response } from "express";
import { generateToken } from "@/lib/utils";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { MessageResponse } from "@/types/express";
import { AuthenticatedUser, IUser } from "@/types/user";
import { HydratedDocument } from "mongoose";
import { LoginRequestBody, SignUpRequestBody } from "@/schemas/auth.schema";

export const signup = async (
  req: Request<{}, {}, SignUpRequestBody>,
  res: Response<AuthenticatedUser | MessageResponse>
) => {
  const { fullName, username, email, password } = req.body;

  try {
    let user: HydratedDocument<IUser> | null = await User.findOne({ email });

    if (user) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    user = await User.findOne({ username });

    if (user) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser: HydratedDocument<IUser> = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id.toString(), res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id.toString(),
        fullName: newUser.fullName,
        username: newUser.username,
        email: newUser.email,
        profilePic: newUser.profilePic,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      });
    } else res.status(400).json({ message: "Invalid user data" });
  } catch (error) {
    console.error("Error in signup controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response<AuthenticatedUser | MessageResponse>
) => {
  const { username, password } = req.body;

  try {
    const user: HydratedDocument<IUser> | null = await User.findOne({
      username,
    });

    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    generateToken(user._id.toString(), res);

    res.status(200).json({
      _id: user._id.toString(),
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error("Error in login controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (_: Request, res: Response<MessageResponse>) => {
  try {
    res.cookie(process.env.JWT_TOKEN_NAME || "chat_app_token", "", {
      maxAge: 0,
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = (
  req: Request,
  res: Response<AuthenticatedUser | MessageResponse>
) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Error in checkAuth controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
