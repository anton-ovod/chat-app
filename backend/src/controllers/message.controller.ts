import User from "@/models/user.model";
import cloudinary from "@/lib/cloudinary";
import { Request, Response } from "express";
import Message from "@/models/message.model";
import { SendMessageRequestBody } from "@/schemas/message.schema";
import {
  MessageDetailsResponse,
  MessageResponse,
  MessagesListResponse,
} from "@/types/express";
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
      text: newMessage.text,
      image: newMessage.image,
      createdAt: newMessage.createdAt,
      updatedAt: newMessage.updatedAt,
    });
  } catch (error) {
    console.error("Error in sendMessage controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const editMessage = async (
  req: Request<{ messageId: string }, {}, SendMessageRequestBody>,
  res: Response<MessageResponse | MessageDetailsResponse>
) => {
  try {
    const { messageId } = req.params;
    const { text, image } = req.body;

    const senderId = req.user._id;

    const oldMessage = await Message.findById(messageId);

    if (!oldMessage) {
      res.status(404).json({ message: "Message not found" });
      return;
    }

    if (oldMessage.senderId.toString() !== senderId) {
      res
        .status(403)
        .json({ message: "You are not authorized to edit this message" });
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

    if (text || imageUrl) {
      oldMessage.text = text || oldMessage.text;
      oldMessage.image = imageUrl || oldMessage.image;
      const updatedMessage = await oldMessage.save();

      if (!updatedMessage) {
        res.status(400).json({ message: "Error updating message" });
        return;
      }
      res.status(200).json({
        _id: updatedMessage._id.toString(),
        senderId: updatedMessage.senderId.toString(),
        receiverId: updatedMessage.receiverId.toString(),
        text: updatedMessage.text,
        image: updatedMessage.image,
        createdAt: updatedMessage.createdAt,
        updatedAt: updatedMessage.updatedAt,
      });
    }
  } catch (error) {
    console.error("Error in editMessage controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  // TODO: implement deleting a message with the given messageId
};

export const getMessages = async (
  req: Request<{ username: string }>,
  res: Response<MessageResponse | MessagesListResponse>
) => {
  try {
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

    const messages = await Message.find({
      conversationId: conversation._id,
    });

    res.status(200).json({
      messages: messages.map((message) => ({
        _id: message._id.toString(),
        senderId: message.senderId.toString(),
        receiverId: message.receiverId.toString(),
        text: message.text,
        image: message.image,
        createdAt: message.createdAt,
        updatedAt: message.updatedAt,
      })),
    });
  } catch (error) {
    console.error("Error in getMessages controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
