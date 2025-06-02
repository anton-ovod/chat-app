import { z } from "zod";
import { base64Schema } from "./base64.schema";
import { userNameSchema } from "./user.schema";

export const sendMessageSchema = z.object({
  text: z
    .string({
      required_error: "Text is required",
      invalid_type_error: "Text must be a string",
    })
    .trim()
    .max(1000, "Text must be at most 1000 characters long"),
  image: z.union([z.literal(""), base64Schema], {
    message: "Image could be empty or base64 encoded",
  }),
});

export type SendMessageRequestBody = z.infer<typeof sendMessageSchema>;

export const editMessageSchema = z.object({
  text: z
    .string({
      required_error: "Text is required",
      invalid_type_error: "Text must be a string",
    })
    .trim()
    .max(1000, "Text must be at most 1000 characters long"),
  image: z.union(
    [
      z.literal(""),
      z
        .string()
        .trim()
        .refine((val) => val.startsWith("https://res.cloudinary.com")),

      base64Schema,
    ],
    {
      message: "Image could be empty, valid Cloudinary URL or base64 encoded",
    }
  ),
});
export type EditMessageRequestBody = z.infer<typeof editMessageSchema>;

export const MessageIdSchema = z.object({
  messageId: z
    .string({
      required_error: "Message ID is required",
      invalid_type_error: "Message ID must be a string",
    })
    .length(24, "Message ID must be exactly 24 characters long"),
});
export type MessageIdRequestParams = z.infer<typeof MessageIdSchema>;

export const getMessagesRequestQueryParamsSchema = z.object({
  limit: z.coerce
    .number({
      required_error: "Limit is required",
      invalid_type_error: "Limit must be a number",
    })
    .max(50, "Limit must be at most 50")
    .min(1, "Limit must be at least 1")
    .default(20)
    .optional(),
  before: z
    .string({
      required_error: "Before is required",
      invalid_type_error: "Before must be a string",
    })
    .optional(),
});
export type GetMessagesRequestQueryParams = z.infer<
  typeof getMessagesRequestQueryParamsSchema
>;
