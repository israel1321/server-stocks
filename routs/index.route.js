import { Router } from "express";
import userRoute from "./user.route.js";
import authRoute from "./auth.route.js";
import stocksRoute from "./stocks.route.js";
import categoriesRoute from "./catgories.route.js";
import Logger from "../utils/logger.js";

const router = Router();

router.use("/", (req, res, next) => {
  Logger.info(`${req.method} ${req.url}`);
  next();
});


router.get("/health", (req, res) => {
  res.json({
    message: "OK",
  });
});

router.use("/user", userRoute);
router.use("/auth", authRoute);
router.use("/stocks", stocksRoute);
router.use("/categories", categoriesRoute);

export default router;
