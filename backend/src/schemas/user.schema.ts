import { z } from "zod";
import { base64Schema } from "./base64.schema";

export const userProfileUpdateSchema = z.object({
  fullName: z.optional(
    z
      .string({
        invalid_type_error: "Full name must be a string",
      })
      .min(3, "Full name must be at least 3 characters long")
  ),
  email: z.optional(
    z
      .string({
        invalid_type_error: "Email must be a string",
      })
      .email("Invalid email address")
  ),
  profilePic: z.optional(base64Schema),
});

export type UserProfileUpdateRequestBody = z.infer<
  typeof userProfileUpdateSchema
>;
