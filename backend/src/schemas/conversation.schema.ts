import { z } from "zod";

export const createConversationSchema = z.object({
  participantId: z
    .string({
      required_error: "Participant ID is required",
      invalid_type_error: "Participant ID must be a string",
    })
    .length(24, "Participant ID must be exactly 24 characters long"),
});

export type CreateConversationRequestBody = z.infer<
  typeof createConversationSchema
>;

export const deleteConversationSchema = z.object({
  conversationId: z
    .string({
      required_error: "Conversation ID is required",
      invalid_type_error: "Conversation ID must be a string",
    })
    .trim()
    .length(24, "Conversation ID must be exactly 24 characters long"),
});

export type DeleteConversationRequestBody = z.infer<
  typeof deleteConversationSchema
>;

export const conversationIdSchema = z.object({
  conversationId: z
    .string({
      required_error: "Conversation ID is required",
      invalid_type_error: "Conversation ID must be a string",
    })
    .length(24, "Conversation ID must be exactly 24 characters long"),
});

export type ConversationIdRequestParams = z.infer<typeof conversationIdSchema>;

export const conversationPaginationQuerySchema = z.object({
  limit: z.coerce.number().min(1).max(50).default(20).optional(),
  skip: z.coerce.number().min(0).default(0).optional(),
});
export type ConversationPaginationQueryParams = z.infer<
  typeof conversationPaginationQuerySchema
>;
