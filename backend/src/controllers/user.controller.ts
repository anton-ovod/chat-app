import cloudinary from "@/lib/cloudinary";
import User from "@/models/user.model";
import { PageBasedPaginationQueryParams } from "@/schemas/pagination.scheme";
import {
  userFullNameRequestParams,
  UserProfileUpdateRequestBody,
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
  req: Request,
  res: Response<FoundUsersListResponse | MessageResponse>
) => {
  try {
    const { fullName } = req.params;
    const { page, pageSize } =
      req.validatedQuery as PageBasedPaginationQueryParams;
    const currentUserId = req.user?._id;

    const skip = (page - 1) * pageSize;

    const totalCount = await User.countDocuments({
      $text: { $search: fullName },
      _id: { $ne: currentUserId },
    });

    if (totalCount === 0) {
      res.status(404).json({ message: "No users found" });
      return;
    }

    const results = await User.find({
      $text: { $search: fullName },
      _id: { $ne: currentUserId },
    })
      .skip(skip)
      .limit(pageSize);

    const totalPages = Math.ceil(totalCount / pageSize);

    if (page > totalPages) {
      res.status(400).json({ message: "Page number exceeds total pages" });
      return;
    }

    const formattedResults = results.map((result) => ({
      _id: result._id.toString(),
      fullName: result.fullName,
      username: result.username,
      profilePic: result.profilePic,
    }));

    res.status(200).json({
      users: formattedResults,
      paginationInfo: {
        totalCount,
        currentPage: page,
        totalPages,
        pageSize: totalCount > pageSize ? pageSize : totalCount,
      },
    });
  } catch (error) {
    console.error("Error in findUserByFullName controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
