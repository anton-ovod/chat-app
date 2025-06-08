import User from "@/models/user.model";
import cloudinary from "@/lib/cloudinary";
import { Request, Response } from "express";
import Message from "@/models/message.model";
import {
  MessageIdRequestParams,
  SendMessageRequestBody,
} from "@/schemas/message.schema";
import {
  MessageDetailsResponse,
  MessageResponse,
  MessagesListResponse,
} from "@/types/express";
import Conversation from "@/models/conversation.model";
import { UsernameRequestParams } from "@/schemas/user.schema";
import { LimitBasedPaginationQueryParams } from "@/schemas/pagination.scheme";

export const sendMessage = async (
  req: Request<UsernameRequestParams, {}, SendMessageRequestBody>,
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

    let imageUrl: string = "";
    if (image) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
      } catch (error) {
        res.status(400).json({ message: "Image is too large" });
        return;
      }
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
  req: Request<MessageIdRequestParams, {}, SendMessageRequestBody>,
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

    let imageUrl: string = "";
    if (image) {
      if (image.startsWith("https://res.cloudinary.com")) {
        imageUrl = image;
      } else {
        const uploadResponse = await cloudinary.uploader.upload(image);
        if (!uploadResponse) {
          res.status(400).json({ message: "Error uploading image" });
          return;
        }
        imageUrl = uploadResponse.secure_url;
      }
    }

    oldMessage.text = text;
    oldMessage.image = imageUrl;
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
  } catch (error) {
    console.error("Error in editMessage controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteMessage = async (
  req: Request<MessageIdRequestParams>,
  res: Response<MessageResponse | MessageDetailsResponse>
) => {
  try {
    const { messageId } = req.params;

    const senderId = req.user._id;

    const message = await Message.findById(messageId);
    if (!message) {
      res.status(404).json({ message: "Message not found" });
      return;
    }

    if (message.senderId.toString() !== senderId) {
      res
        .status(403)
        .json({ message: "You are not authorized to delete this message" });
      return;
    }

    const messageDeleteResult = await Message.deleteOne({ _id: messageId });
    if (!messageDeleteResult.acknowledged) {
      res.status(400).json({ message: "Error deleting message" });
      return;
    }
    res.status(200).json({
      _id: message._id.toString(),
      senderId: message.senderId.toString(),
      receiverId: message.receiverId.toString(),
      text: message.text,
      image: message.image,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
    });
  } catch (error) {
    console.error("Error in deleteMessage controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (
  req: Request,
  res: Response<MessageResponse | MessagesListResponse>
) => {
  try {
    const { username } = req.params;
    const { before, limit, after } =
      req.validatedQuery as LimitBasedPaginationQueryParams;
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

    const query: any = { conversationId: conversation._id };

    let sort: 1 | -1 = -1;

    if (before) {
      query.createdAt = { $lt: new Date(before) };
      sort = -1;
    } else if (after) {
      query.createdAt = { $gt: new Date(after) };
      sort = 1;
    }

    const messages = await Message.find(query)
      .sort({ createdAt: sort })
      .limit(limit + 1);

    const hasMore = messages.length > limit;
    const slicedMessages = messages.slice(0, limit);
    const finalMessages =
      sort === -1 ? slicedMessages.reverse() : slicedMessages;

    const hasNextPage = sort === -1 ? hasMore : !!after;
    const hasPreviousPage = sort === 1 ? hasMore : !!before;

    const nextCursor =
      hasNextPage && finalMessages.length
        ? finalMessages[0].createdAt.toISOString()
        : undefined;

    const previousCursor =
      hasPreviousPage && finalMessages.length
        ? finalMessages[finalMessages.length - 1].createdAt.toISOString()
        : undefined;

    res.status(200).json({
      messages: finalMessages.map((message) => ({
        _id: message._id.toString(),
        senderId: message.senderId.toString(),
        receiverId: message.receiverId.toString(),
        text: message.text,
        image: message.image,
        createdAt: message.createdAt,
        updatedAt: message.updatedAt,
      })),
      paginationInfo: {
        hasNextPage,
        hasPreviousPage,
        nextCursor,
        previousCursor,
        limit,
      },
    });
  } catch (error) {
    console.error("Error in getMessages controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
