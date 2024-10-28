import { Router } from "express";
import { getLocations } from "../controllers/location";

const locationRouters = Router();

locationRouters.get("/get-locations", getLocations);

export default locationRouters;
