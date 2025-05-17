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
  username: z.optional(
    z
      .string({
        invalid_type_error: "Username must be a string",
      })
      .min(5, "Username must be at least 5 characters long")
      .max(20, "Username must be at most 20 characters long")
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

export const userNameSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string",
    })
    .min(3, "Username must be at least 3 characters long"),
});

export type UsernameRequestParams = z.infer<typeof userNameSchema>;

export const userFullNameSchema = z.object({
  fullName: z
    .string({
      required_error: "Full name is required",
      invalid_type_error: "Full name must be a string",
    })
    .min(3, "Full name must be at least 3 characters long")
    .max(50, "Full name must be at most 50 characters long"),
});

export type userFullNameRequestParams = z.infer<typeof userFullNameSchema>;
