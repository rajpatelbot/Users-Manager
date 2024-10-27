import * as express from "express";
import { createUser, deleteUser, getUsers } from "../controllers/user";

const router = express.Router();

// @ts-ignore
router.post("/create-user", createUser);
// @ts-ignore
router.get("/get-users", getUsers);
// @ts-ignore
router.delete("/delete-user/:id", deleteUser);

export default router;
