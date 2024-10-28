import { Request, Response } from "express";
import { User } from "../models/user";
import { Location } from "../models/location";
import { ResponseFormatter, STATUS_CODES } from "../utils/response";

export const createUser = async (req: Request, res: Response) => {
  const response = new ResponseFormatter(req, res);

  try {
    const { name, mobile, stateId, cityId } = req.body;

    // check if user already exists.
    const isUserExist = await User.findOne({ mobile });

    if (isUserExist) {
      throw "User already exists.";
    }

    // Check if given state and city exists in DB.
    const state = await Location.findOne({ _id: stateId });

    if (!state) {
      throw "State does not exist.";
    }

    const isCityExist = state?.cities.map((city) => city._id.toString()).includes(cityId);

    if (!isCityExist) {
      throw "City does not exist.";
    }

    await User.create({ name, mobile, stateId, cityId });

    response.status(STATUS_CODES.CREATED).message("User created successfully.").success(true).send();
  } catch (e) {
    const err = e as string;
    response.status(STATUS_CODES.BAD_REQUEST).data({}).error(err).success(false).send();
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const response = new ResponseFormatter(req, res);

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

    response.status(STATUS_CODES.OK).data(users).message("User fetched successfully.").success(true).send();
  } catch (e) {
    const err = e as string;
    response.status(STATUS_CODES.BAD_REQUEST).data({}).error(err).success(false).send();
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const response = new ResponseFormatter(req, res);

  try {
    const { id } = req.params;
    const { name, mobile, stateId, cityId } = req.body;

    if (!id) {
      throw "Something went wrong.";
    }

    const isUserExist = await User.findOne({ _id: id });

    if (!isUserExist) {
      throw "User does not exist.";
    }

    await User.updateOne(
      { _id: id },
      {
        name,
        mobile,
        stateId,
        cityId,
      }
    );

    response.status(STATUS_CODES.OK).message("User updated successfully.").success(true).send();
  } catch (e) {
    const err = e as string;
    response.status(STATUS_CODES.BAD_REQUEST).data({}).error(err).success(false).send();
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const response = new ResponseFormatter(req, res);

  try {
    const { id } = req.params;

    if (!id) {
      throw "Something went wrong.";
    }

    const isUserExist = await User.findOne({ _id: id });

    if (!isUserExist) {
      throw "User does not exist.";
    }

    await User.deleteOne({ _id: id });

    response.status(STATUS_CODES.OK).message("User deleted successfully.").success(true).send();
  } catch (e) {
    const err = e as string;
    response.status(STATUS_CODES.BAD_REQUEST).data({}).error(err).success(false).send();
  }
};
