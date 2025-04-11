import { z } from "zod";
import { base64Schema } from "./base64.schema";

export const sendMessageSchema = z.object({
  receiverId: z
    .string({
      required_error: "Receiver ID is required",
      invalid_type_error: "Receiver ID must be a string",
    })
    .trim()
    .length(24, "Receiver ID must be exactly 24 characters long"),
  conversationId: z
    .string({
      required_error: "Conversation ID is required",
      invalid_type_error: "Conversation ID must be a string",
    })
    .trim()
    .length(24, "Conversation ID must be exactly 24 characters long"),
  text: z.optional(
    z
      .string({
        invalid_type_error: "Text must be a string",
      })
      .trim()
      .min(1, "Text must be at least 1 character long")
      .max(1000, "Text must be at most 1000 characters long")
  ),
  image: z.optional(base64Schema),
});
