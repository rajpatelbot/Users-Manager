import fs from "fs";
import path from "path";
import { Location } from "../models/location";
import { LocationDocument } from "../models/types";
import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/users-manager";

export const seedLocationToDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // get the file's path.
    const dataPath = path.join(__dirname, "../data/location.json");
    // read the file with utf8 encoding format.
    const rawData = fs.readFileSync(dataPath, "utf8");
    const locationData = JSON.parse(rawData);
    console.log("Data has been parsed successfully.");

    // remove old data from DB, as we are going to seed the same data again.
    await Location.deleteMany({});
    console.log("Old data has been removed successfully.");

    // insert new data into DB.
    const structuredData = Object.keys(locationData).map((stateName) => ({
      state: stateName,
      cities: locationData[stateName].map((cityName: string) => ({
        name: cityName,
      })),
    })) as LocationDocument[];

    await Location.insertMany(structuredData);
    console.log("Locations has been inserted successfully.");
  } catch (error) {
    console.log({ error });
  } finally {
    mongoose.disconnect();
    mongoose.connection.close();
    console.log("Connection has been closed and DB has been disconnected.");
  }
};

seedLocationToDB();
