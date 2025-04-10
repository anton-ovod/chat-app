import { MessageResponse } from "@/types/express";
import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response<MessageResponse>, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      res.status(400).json({
        message: Object.values(fieldErrors)[0]?.[0] || "Invalid input",
      });
      return;
    }

    req.body = result.data;
    next();
  };
