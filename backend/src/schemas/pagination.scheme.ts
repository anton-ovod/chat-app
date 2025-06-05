import { z } from "zod";

export const pageBasedPaginationQueryParamsSchema = z.object({
  page: z.coerce.number().min(1, "Page number must be at least 1").default(1),
  pageSize: z.coerce
    .number()
    .min(1, "Page size must be at least 1")
    .max(10, "Page size must not exceed 10")
    .default(5),
});
export type PageBasedPaginationQueryParams = z.infer<
  typeof pageBasedPaginationQueryParamsSchema
>;
