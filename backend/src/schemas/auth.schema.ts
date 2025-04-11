import { z } from "zod";

export const signupSchema = z.object({
  fullName: z
    .string({
      required_error: "Full name is required",
      invalid_type_error: "Full name must be a string",
    })
    .trim()
    .min(3, "Full name must be at least 3 characters long"),
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string",
    })
    .trim()
    .min(5, "Username must be at least 5 characters long")
    .max(20, "Username must be at most 20 characters long"),
  email: z
    .string({
      required_error: "Email is required",
    })
    .trim()
    .email("Invalid email address"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .trim()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
});

export type SignUpRequestBody = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string",
    })
    .trim(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .trim(),
});

export type LoginRequestBody = z.infer<typeof loginSchema>;
