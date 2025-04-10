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
