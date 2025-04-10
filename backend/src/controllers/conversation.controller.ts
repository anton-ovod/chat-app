import Conversation from "@/models/conversation.model";
import User from "@/models/user.model";
import { CreateConversationRequestBody } from "@/schemas/conversation.schema";
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

    const formattedConversations = conversations
      .map((conversation) => {
        return conversation.participants.filter(
          (participant) => participant._id.toString() !== userId
        );
      })
      .flat();
    res.status(200).json({
      conversations: formattedConversations.map((conversation) => ({
        _id: conversation._id.toString(),
        fullName: conversation.fullName,
        username: conversation.username,
        profilePic: conversation.profilePic,
      })),
    });
  } catch (error) {
    console.error("Error in getConversations controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getConversationDetails = async (req: Request, res: Response) => {
  // TODO: implement retrieving details of a specific conversation
};

export const deleteConversation = async (req: Request, res: Response) => {
  //TODO: implement deleting a conversation
};
