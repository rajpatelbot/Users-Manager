import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/mongoose";

import userRouters from "./routers/user";
import locationRouters from "./routers/location";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8001;

app.use(cors());

connectDB();

app.use(express.json());

app.get("/health-check", (_req, res) => {
  res.status(200).send("OK");
});

app.use(userRouters);
app.use(locationRouters);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
