import cloudinary from "@/lib/cloudinary";
import User from "@/models/user.model";
import { UserProfileUpdateRequestBody } from "@/schemas/user.schema";
import { MessageResponse, UserDetailsResponse } from "@/types/express";
import { IUser } from "@/types/user";
import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";

export const updateProfile = async (
  req: Request<{}, {}, UserProfileUpdateRequestBody>,
  res: Response<MessageResponse | UserDetailsResponse>
) => {
  try {
    const { fullName, username, email, profilePic } = req.body;
    const userId = req.user!._id;

    if (!profilePic) {
      res.status(400).json({ message: "Profile picture is required" });
      return;
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    if (!uploadResponse) {
      res.status(400).json({ message: "Error uploading profile picture" });
      return;
    }

    const updatedUser: HydratedDocument<IUser> | null =
      await User.findByIdAndUpdate(
        userId,
        { fullName, email, username, profilePic: uploadResponse.secure_url },
        { new: true }
      );

    if (!updatedUser) {
      res.status(400).json({ message: "Error updating profile" });
      return;
    }

    res.status(200).json({
      _id: updatedUser._id.toString(),
      fullName: updatedUser.fullName,
      username: updatedUser.username,
      email: updatedUser.email,
      profilePic: updatedUser.profilePic,
    });
  } catch (error) {
    console.error("Error in updateProfile controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
