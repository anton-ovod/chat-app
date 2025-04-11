import User from "@/models/user.model";
import cloudinary from "@/lib/cloudinary";
import { Request, Response } from "express";
import Message from "@/models/message.model";
import { SendMessageRequestBody } from "@/schemas/message.schema";
import { MessageDetailsResponse, MessageResponse } from "@/types/express";
import Conversation from "@/models/conversation.model";

export const sendMessage = async (
  req: Request<{ username: string }, {}, SendMessageRequestBody>,
  res: Response<MessageResponse | MessageDetailsResponse>
) => {
  try {
    const { text, image } = req.body;
    const { username } = req.params;

    const senderId = req.user._id;

    const receiver = await User.findOne({ username });
    if (!receiver) {
      res.status(404).json({ message: "Receiver not found" });
      return;
    }

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiver._id] },
    });
    if (!conversation) {
      res.status(404).json({ message: "Conversation not found" });
      return;
    }

    let imageUrl: string | undefined = undefined;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      if (!uploadResponse) {
        res.status(400).json({ message: "Error uploading image" });
        return;
      }
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId: receiver._id.toString(),
      conversationId: conversation._id.toString(),
      text,
      image: imageUrl,
    });

    if (!newMessage) {
      res.status(400).json({ message: "Error creating message" });
      return;
    }
    await newMessage.save();
    res.status(201).json({
      _id: newMessage._id.toString(),
      senderId: newMessage.senderId.toString(),
      receiverId: newMessage.receiverId.toString(),
      conversationId: newMessage.conversationId.toString(),
      text: newMessage.text,
      image: newMessage.image,
    });
  } catch (error) {
    console.error("Error in sendMessage controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const editMessage = async (req: Request, res: Response) => {
  // TODO: implement editing a message with the given messageId
};

export const deleteMessage = async (req: Request, res: Response) => {
  // TODO: implement deleting a message with the given messageId
};

export const getMessages = async (req: Request, res: Response) => {
  // TODO: implement logic for getting messages with pagination for a conversation
};
