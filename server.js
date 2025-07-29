import express from "express";
import cors from "cors";
import indexRoute from "./routs/index.route.js";
import "./db/dbConnection.js";
 import Logger from "./utils/logger.js";
import { PORT } from "./envconfig.js";
const app = express();

app.use(cors());

app.use(express.json());

app.use(indexRoute);

app.listen(PORT, () => {
  Logger.info(`Server is running on port http://localhost:${PORT}`);
});
