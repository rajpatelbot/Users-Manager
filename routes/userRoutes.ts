import * as express from "express";
import { createUser } from "../controllers/user";

const router = express.Router();

router.post("/create-user", createUser);

export default router;
