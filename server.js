import express from "express";
import cors from "cors";
import indexRoute from "./routs/index.route.js";
import "./db/dbConnection.js";
import { uploadMockData } from "./utils/uploadMockData.js";
import Logger from "./utils/logger.js";
const app = express();

app.use(cors());

app.use(express.json());

app.use(indexRoute);

uploadMockData().then(() => {
  app.listen(3000, () => {
    Logger.info("Server is running on port http://localhost:3000");
  });
});
