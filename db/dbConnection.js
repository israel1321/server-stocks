import mongoose from "mongoose";
import { MONGO_URL } from "../envconfig.js";

try {
  await mongoose.connect(MONGO_URL);
  console.log("mongo connected");
} catch (error) {
  console.log(error);
}
