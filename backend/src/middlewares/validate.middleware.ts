import { MessageResponse } from "@/types/express";
import { Request, Response, NextFunction } from "express";
import { z, ZodSchema } from "zod";

type Schemas = {
  body?: ZodSchema<any>;
  params?: ZodSchema<any>;
  query?: ZodSchema<any>;
};

const handleZodError = (res: Response, error: z.ZodError) => {
  const { fieldErrors, formErrors } = error.flatten();
  const message =
    fieldErrors?.[Object.keys(fieldErrors)[0]]?.[0] ||
    formErrors?.[0] ||
    "Invalid input";

  res.status(400).json({ message });
};
export const validate =
  ({ body, params, query }: Schemas) =>
  (req: Request, res: Response<MessageResponse>, next: NextFunction) => {
    try {
      if (body) {
        const result = body.safeParse(req.body);
        if (!result.success) return handleZodError(res, result.error);
        Object.assign(req.body, result.data);
      }

      if (params) {
        const result = params.safeParse(req.params);
        if (!result.success) return handleZodError(res, result.error);
        Object.assign(req.params, result.data);
      }

      if (query) {
        console.log("Validating query: ", req.query);
        const result = query.safeParse(req.query);
        if (!result.success) return handleZodError(res, result.error);
        Object.assign(req.query, result.data);
      }

      next();
    } catch (error) {
      console.error("Error in validation middleware: ", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
