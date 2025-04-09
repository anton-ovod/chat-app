import User from "@/models/user.model";
import cloudinary from "@/lib/cloudinary";
import { Request, Response } from "express";
import Message from "@/models/message.model";
export const getUsersForSidebar = async (req: Request, res: Response) => {
  try {
    const loggedInUserId = req.user!._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user!._id;

    const messages = await Message.find({
      $or: [
        { senderId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: senderId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessages: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user!._id;

    let imageUrl;
    if (image) {
      const uploadedResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadedResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();
    // TODO: realtime functionality goes here => socket.io
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
