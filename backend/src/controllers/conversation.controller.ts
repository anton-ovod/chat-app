import { Request, Response } from "express";

export const getConversations = async (req: Request, res: Response) => {
  // TODO: implement retrieving with pagination all conversations for logged in user
};

export const getConversationByUsername = async (
  req: Request,
  res: Response
) => {
  // TODO: implement retrieving with pagination all messages between logged in user and the user with the given username
};
