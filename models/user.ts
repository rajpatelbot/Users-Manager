import mongoose, { Schema } from "mongoose";
import { UserDocument } from "./types";

const userSchema = new Schema<UserDocument>({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  state: {
    type: Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  city: {
    type: Schema.Types.ObjectId,
    ref: "Location.state.city",
    required: true,
  },
});

export const User = mongoose.model<UserDocument>("user", userSchema);
