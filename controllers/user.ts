import { Request, Response } from "express";
import { User } from "../models/user";
import { RESPONSE_MESSAGE, STATUS_CODES } from "../utils/response";
import { logger } from "../utils/logger";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, mobile, state, city } = req.body;

    const user = await User.create({ name, mobile, state, city });

    res.status(201).json(user);
  } catch (error) {
    console.log({ error });
    // logger.error(error.message);
    res.status(STATUS_CODES.SERVER_ERROR).json({ error: RESPONSE_MESSAGE.SERVER_ERROR });
  }
};
