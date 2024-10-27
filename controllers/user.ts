import { Request, Response } from "express";
import { User } from "../models/user";
import { Location } from "../models/location";
import { RESPONSE_MESSAGE, STATUS_CODES } from "../utils/response";
import { logger } from "../utils/logger";
import { Error } from "mongoose";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, mobile, stateId, cityId } = req.body;

    // check if user already exists.
    const isUserExist = await User.findOne({ mobile });

    if (isUserExist) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({ success: false, message: "User already exists." });
    }

    // Check if given state and city exists in DB.
    const state = await Location.findOne({ _id: stateId });

    if (!state) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({ success: false, message: "State does not exist." });
    }

    const isCityExist = state.cities.map((city) => city._id.toString()).includes(cityId);

    if (!isCityExist) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({ success: false, message: "City does not exist." });
    }

    await User.create({ name, mobile, stateId, cityId });

    return res.status(STATUS_CODES.CREATED).json({ success: true, message: "User created successfully." });
  } catch (error) {
    const err = error as Error;
    logger.error(err.message);
    return res.status(STATUS_CODES.SERVER_ERROR).json({ success: false, error: RESPONSE_MESSAGE.SERVER_ERROR });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.aggregate([
      {
        $lookup: {
          from: "locations",
          localField: "stateId",
          foreignField: "_id",
          as: "state",
        },
      },
      {
        $unwind: "$state",
      },
      {
        $project: {
          __v: 0,
          stateId: 0,
          cityId: 0,
          "state.__v": 0,
        },
      },
    ]);

    return res.status(STATUS_CODES.OK).json({ success: true, data: users });
  } catch (error) {
    const err = error as Error;
    logger.error(err.message);
    return res.status(STATUS_CODES.SERVER_ERROR).json({ success: false, error: RESPONSE_MESSAGE.SERVER_ERROR });
  }
};

export const updateUsers = async (req: Request, res: Response) => {};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      logger.error("Id is required for deleting a user.");
      return res.status(STATUS_CODES.BAD_REQUEST).json({ success: false, message: "Something went wrong." });
    }

    const isUserExist = await User.findOne({ _id: id });

    if (!isUserExist) {
      logger.error("User does not exist.");
      return res.status(STATUS_CODES.BAD_REQUEST).json({ success: false, message: "User does not exist." });
    }

    await User.deleteOne({ _id: id });
    return res.status(STATUS_CODES.OK).json({ success: true, message: "User deleted successfully." });
  } catch (error) {
    const err = error as Error;
    logger.error(err.message);
    return res.status(STATUS_CODES.SERVER_ERROR).json({ success: false, error: RESPONSE_MESSAGE.SERVER_ERROR });
  }
};
