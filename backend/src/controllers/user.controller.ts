import cloudinary from "@/lib/cloudinary";
import User from "@/models/user.model";
import {
  userFullNameRequestParams,
  UserProfileUpdateRequestBody,
  userSearchQuerySchema,
  UserSearchQueryParams,
} from "@/schemas/user.schema";
import { FoundUsersListResponse, MessageResponse } from "@/types/express";
import { AuthenticatedUser, IUser } from "@/types/user";
import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";

export const updateProfile = async (
  req: Request<{}, {}, UserProfileUpdateRequestBody>,
  res: Response<MessageResponse | AuthenticatedUser>
) => {
  try {
    const { fullName, username, email, profilePic } = req.body;
    const userId = req.user!._id;

    let uploadResponse = null;

    if (profilePic) {
      uploadResponse = await cloudinary.uploader.upload(profilePic);

      if (!uploadResponse) {
        res.status(400).json({ message: "Error uploading profile picture" });
        return;
      }
    }

    const updateData: Partial<IUser> = { fullName, email, username };

    if (uploadResponse) {
      updateData.profilePic = uploadResponse.secure_url;
    }

    const updatedUser: HydratedDocument<IUser> | null =
      await User.findByIdAndUpdate(userId, updateData, { new: true });

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
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    });
  } catch (error) {
    console.error("Error in updateProfile controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const findUserByFullName = async (
  req: Request<userFullNameRequestParams, {}, {}, UserSearchQueryParams>,
  res: Response<FoundUsersListResponse | MessageResponse>
) => {
  try {
    const { fullName } = req.params;
    const limit = req.query.limit;
    const skip = req.query.skip;
    const currentUserId = req.user?._id;

    const totalCount = await User.countDocuments({
      $text: { $search: fullName },
      _id: { $ne: currentUserId },
    });

    const results = await User.find({
      $text: { $search: fullName },
      _id: { $ne: currentUserId },
    })
      .skip(skip!)
      .limit(limit!);

    const formattedResults = results.map((result) => ({
      _id: result._id.toString(),
      fullName: result.fullName,
      username: result.username,
      profilePic: result.profilePic,
    }));

    res.status(200).json({
      users: formattedResults,
      totalCount,
    });
  } catch (error) {
    console.error("Error in findUserByFullName controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
