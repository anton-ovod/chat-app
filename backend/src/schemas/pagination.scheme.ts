import { z } from "zod";

export const pageBasedPaginationQueryParamsSchema = z.object({
  page: z.coerce
    .number({
      required_error: "Page number is required",
      invalid_type_error: "Page number must be a number",
    })
    .min(1, "Page number must be at least 1")
    .default(1),
  pageSize: z.coerce
    .number({
      required_error: "Page size is required",
      invalid_type_error: "Page size must be a number",
    })
    .min(1, "Page size must be at least 1")
    .max(10, "Page size must not exceed 10")
    .default(5),
});
export type PageBasedPaginationQueryParams = z.infer<
  typeof pageBasedPaginationQueryParamsSchema
>;

export const limitBasedPaginationQueryParamsSchema = z
  .object({
    limit: z.coerce
      .number({
        required_error: "Limit is required",
        invalid_type_error: "Limit must be a number",
      })
      .min(1, "Limit must be at least 1")
      .max(50, "Limit must not exceed 50")
      .default(20),
    before: z
      .string({
        required_error: "Before cursor is required",
        invalid_type_error: "Before cursor must be a string",
      })
      .datetime({
        message: "Before cursor must be a valid date string",
        offset: true,
      })
      .optional(),
    after: z
      .string({
        required_error: "After cursor is required",
        invalid_type_error: "After cursor must be a string",
      })
      .datetime({
        message: "After cursor must be a valid date string",
        offset: true,
      })
      .optional(),
  })
  .refine((data) => !(data.before && data.after), {
    message: "Cannot use both 'before' and 'after' cursors.",
    path: ["before"],
  });

export type LimitBasedPaginationQueryParams = z.infer<
  typeof limitBasedPaginationQueryParamsSchema
>;
