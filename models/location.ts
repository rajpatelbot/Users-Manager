import mongoose, { Schema } from "mongoose";
import { LocationDocument } from "./types";

const locationSchema = new Schema<LocationDocument>({
  state: {
    type: String,
    required: true,
  },
  cities: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
});

export const Location = mongoose.model<LocationDocument>("locations", locationSchema);
