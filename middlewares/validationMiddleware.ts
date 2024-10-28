import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { STATUS_CODES } from "../utils/response";

export function validateData(schema: z.AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: z.ZodIssue) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        res.status(STATUS_CODES.BAD_REQUEST).json({ error: "Invalid data", details: errorMessages });
      } else {
        res.status(STATUS_CODES.SERVER_ERROR).json({ error: "Internal Server Error" });
      }
    }
  };
}
