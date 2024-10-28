import { Request, Response } from "express";
import { ResponseFormatter, STATUS_CODES } from "../utils/response";
import { Location } from "../models/location";

export const getLocations = async (req: Request, res: Response) => {
  const response = new ResponseFormatter(req, res);

  try {
    const locations = await Location.find({}).select("-__v");

    response.status(STATUS_CODES.OK).data(locations).message("Locations fetched successfully.").success(true).send();
  } catch (e) {
    const err = e as string;
    response.status(STATUS_CODES.BAD_REQUEST).data({}).error(err).success(false).send();
  }
};
