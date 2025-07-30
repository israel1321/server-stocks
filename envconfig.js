import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
export const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/stocks";

