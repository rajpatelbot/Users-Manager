import { Router } from "express";
import { createUser, deleteUser, getUsers, updateUser } from "../controllers/user";
import { validateData } from "../middlewares/validationMiddleware";
import { updateUserSchema, createUserSchema } from "../validation/userSchema";

const userRouters = Router();

userRouters.post("/create-user", validateData(createUserSchema), createUser);
userRouters.get("/get-users", getUsers);
userRouters.put("/update-user/:id", validateData(updateUserSchema), updateUser);
userRouters.delete("/delete-user/:id", deleteUser);

export default userRouters;
