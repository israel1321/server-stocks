import e, { Router } from "express";
import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  try {
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" });
    }
    user.password = "********";
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new UserModel({ name, email, password: passwordHash });
    await user.save();
    user.password = "********";
    res.json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(400).json(error);
  }

  
router.post("/validate", async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, "secret");

    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    user.password = "********";
    res.json(user);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired",
      });
    }
    res.status(400).json(err);
  }
  
 
});


});

export default router;
