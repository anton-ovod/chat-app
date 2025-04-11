import { MessageResponse } from "@/types/express";
import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response<MessageResponse>, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const { fieldErrors, formErrors } = result.error.flatten();
      const message =
        fieldErrors?.[Object.keys(fieldErrors)[0]]?.[0] ||
        formErrors?.[0] ||
        "Invalid input";

      res.status(400).json({ message });
      return;
    }

    req.body = result.data;
    next();
  };
