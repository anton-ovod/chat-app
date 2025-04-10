import User from "@/models/user.model";
import cloudinary from "@/lib/cloudinary";
import { Request, Response } from "express";
import Message from "@/models/message.model";

export const sendMessage = async (req: Request, res: Response) => {
  // TODO: implement sending a message to the user with the given username
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
