import { z } from "zod";

const base64Regex = /^[A-Za-z0-9+/=]+$/;

export const base64Schema = z
  .string({
    invalid_type_error: "Base64 string must be a string",
  })
  .trim()
  .refine((val) => val.startsWith("data:image/"), {
    message: "Invalid image format, should start with 'data:image/'",
  })
  .refine((val) => base64Regex.test(val.split(",")[1] || ""), {
    message: "Invalid Base64 string format",
  });
