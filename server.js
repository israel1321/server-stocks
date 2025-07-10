import express from "express";
import cors from "cors";
import indexRoute from "./routs/index.route.js";
 import "./db/dbConnection.js";
const app = express();

app.use(cors());

app.use(express.json());

app.use(indexRoute);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
