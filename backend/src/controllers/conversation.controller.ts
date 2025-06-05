import Conversation from "@/models/conversation.model";
import Message from "@/models/message.model";
import User from "@/models/user.model";
import {
  ConversationIdRequestParams,
  CreateConversationRequestBody,
} from "@/schemas/conversation.schema";
import { PageBasedPaginationQueryParams } from "@/schemas/pagination.scheme";
import {
  ConversationDetailsResponse,
  MessageResponse,
  UserConversationsResponse,
} from "@/types/express";
import { Request, RequestHandler, Response } from "express";

export const createConversation = async (
  req: Request<{}, {}, CreateConversationRequestBody>,
  res: Response<MessageResponse | ConversationDetailsResponse>
) => {
  try {
    const { participantId } = req.body;
    const userId = req.user._id;

    if (userId === participantId) {
      res
        .status(400)
        .json({ message: "You cannot start a conversation with yourself" });
      return;
    }

    const participant = await User.findOne({ _id: participantId });

    if (!participant) {
      res.status(404).json({ message: "Participant not found" });
      return;
    }

    const existingConversation = await Conversation.findOne({
      participants: { $all: [userId, participantId] },
    });

    if (existingConversation) {
      res.status(400).json({
        message: "Conversation already exists",
      });
      return;
    }

    const newConversation = new Conversation({
      participants: [userId, participantId],
    });
    await newConversation.save();

    if (!newConversation) {
      res.status(400).json({ message: "Error creating conversation" });
      return;
    }

    res.status(201).json({
      conversation: {
        _id: newConversation._id.toString(),
        receiver: {
          _id: participant._id.toString(),
          fullName: participant.fullName,
          username: participant.username,
          profilePic: participant.profilePic,
        },
      },
    });
  } catch (error) {
    console.error("Error in createConversation controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getConversations = async (
  req: Request,
  res: Response<MessageResponse | UserConversationsResponse>
) => {
  try {
    const userId = req.user._id;
    const { page, pageSize } =
      req.validatedQuery as PageBasedPaginationQueryParams;

    console.log("Page: ", page, "Page Size: ", pageSize);

    const skip = (page - 1) * pageSize;

    const totalCount = await Conversation.countDocuments({
      participants: userId,
    });

    const conversations = await Conversation.find({
      participants: userId,
    })
      .populate("participants", "fullName username profilePic")
      .skip(skip)
      .limit(pageSize);

    if (!conversations) {
      res.status(404).json({ message: "No conversations found" });
      return;
    }

    const totalPages = Math.ceil(totalCount / pageSize);

    const formattedConversations = conversations.map((conversation) => {
      const otherParticipant = conversation.participants.find(
        (participant) => participant._id.toString() !== userId.toString()
      )!;
      return {
        _id: conversation._id.toString(),
        receiver: {
          _id: otherParticipant._id.toString(),
          fullName: otherParticipant.fullName,
          username: otherParticipant.username,
          profilePic: otherParticipant.profilePic,
        },
      };
    });

    res.status(200).json({
      conversations: formattedConversations,
      paginationInfo: {
        totalCount,
        currentPage: page,
        totalPages,
        pageSize: totalCount > pageSize ? pageSize : totalCount,
      },
    });
  } catch (error) {
    console.error("Error in getConversations controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteConversation = async (
  req: Request<ConversationIdRequestParams>,
  res: Response<MessageResponse & { conversationId: string }>
) => {
  try {
    const { conversationId } = req.params;

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      res
        .status(404)
        .json({ message: "Conversation not found", conversationId });
      return;
    }

    const deleteMessagesResult = await Message.deleteMany({ conversationId });

    if (!deleteMessagesResult.acknowledged) {
      res
        .status(400)
        .json({ message: "Error deleting messages", conversationId });
      return;
    }

    const deleteConversationResult = await Conversation.deleteOne({
      _id: conversationId,
    });

    if (!deleteConversationResult.acknowledged) {
      res
        .status(400)
        .json({ message: "Error deleting conversation", conversationId });
      return;
    }

    res.status(200).json({
      message: `Conversation with ${deleteMessagesResult.deletedCount} messages deleted.`,
      conversationId,
    });
  } catch (error) {
    console.error("Error in deleteConversation controller: ", error);
    res.status(500).json({
      message: "Internal server error",
      conversationId: req.params.conversationId,
    });
  }
};
