import mongoose, { Schema } from "mongoose";
import { UserDocument } from "./types";

const userSchema = new Schema<UserDocument>({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    unique: true,
    required: true,
  },
  stateId: {
    type: Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  cityId: {
    type: Schema.Types.ObjectId,
    ref: "Location.state.city",
    required: true,
  },
});

export const User = mongoose.model<UserDocument>("user", userSchema);
