import { Schema } from "mongoose";

export interface UserDocument extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  mobile: string;
  city: Schema.Types.ObjectId;
  state: Schema.Types.ObjectId;
}

export interface LocationDocument extends Document {
  _id: Schema.Types.ObjectId;
  state: string;
  cities: City[];
}

export interface City {
  _id: Schema.Types.ObjectId;
  name: string;
}
