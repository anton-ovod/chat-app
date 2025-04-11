import Conversation from "@/models/conversation.model";
import Message from "@/models/message.model";
import User from "@/models/user.model";
import {
  ConversationIdRequestParams,
  CreateConversationRequestBody,
  DeleteConversationRequestBody,
} from "@/schemas/conversation.schema";
import {
  ConversationDetailsResponse,
  MessageResponse,
  UserConversationsResponse,
} from "@/types/express";
import { Request, Response } from "express";

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
      _id: newConversation._id.toString(),
      participants: newConversation.participants.map((participant) => ({
        _id: participant._id.toString(),
      })),
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
  // TODO: implement pagination for conversations
  try {
    const userId = req.user._id;
    const conversations = await Conversation.find({
      participants: userId,
    }).populate("participants", "name username profilePic");

    if (!conversations) {
      res.status(404).json({ message: "No conversations found" });
      return;
    }

    const formattedConversations = conversations.map((conversation) => {
      const otherParticipant = conversation.participants.find(
        (participant) => participant._id.toString() !== userId.toString()
      )!;
      return {
        _id: conversation._id.toString(),
        fullName: otherParticipant.fullName,
        username: otherParticipant.username,
        profilePic: otherParticipant.profilePic,
      };
    });

    res.status(200).json({
      conversations: formattedConversations,
    });
  } catch (error) {
    console.error("Error in getConversations controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteConversation = async (
  req: Request<ConversationIdRequestParams>,
  res: Response<MessageResponse>
) => {
  try {
    const { conversationId } = req.params;

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      res.status(404).json({ message: "Conversation not found" });
      return;
    }

    const deleteMessagesResult = await Message.deleteMany({ conversationId });

    if (!deleteMessagesResult.acknowledged) {
      res.status(400).json({ message: "Error deleting messages" });
      return;
    }

    const deleteConversationResult = await Conversation.deleteOne({
      _id: conversationId,
    });

    if (!deleteConversationResult.acknowledged) {
      res.status(400).json({ message: "Error deleting conversation" });
      return;
    }

    res.status(200).json({
      message: `Conversation with ${deleteMessagesResult.deletedCount} messages deleted.`,
    });
  } catch (error) {
    console.error("Error in deleteConversation controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
