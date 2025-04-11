import { z } from "zod";
import { base64Schema } from "./base64.schema";

export const sendMessageSchema = z
  .object({
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
  })
  .refine((data) => data.text || data.image, {
    message: "Either text or image must be provided",
  });

export type SendMessageRequestBody = z.infer<typeof sendMessageSchema>;
