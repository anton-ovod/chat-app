import cloudinary from "@/lib/cloudinary";
import User from "@/models/user.model";
import { MessageResponse, UserDetailsResponse } from "@/types/express";
import { Request, Response } from "express";

export const updateProfile = async (
  req: Request,
  res: Response<MessageResponse | UserDetailsResponse>
) => {
  try {
    const { profilePic } = req.body;
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

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    if (!updatedUser) {
      res.status(400).json({ message: "Error updating profile picture" });
      return;
    }

    res.status(200).json({
      _id: updatedUser._id.toString(),
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      profilePic: updatedUser.profilePic,
    });
  } catch (error) {
    console.error("Error in updateProfile controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
