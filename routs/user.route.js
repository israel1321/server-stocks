import { Router } from "express";
import UserModel from "../models/user.model.js";
import {
  validateAdmin,
  validateToken,
} from "../middlewares/tokenValidation.js";
import {
  CreateUserSchema,
  UpdateUserSchema,
  DeleteUserSchema,
  UserIdSchema,
} from "../zod/user.model.js";

const router = Router();

router.get("/", validateToken, validateAdmin, async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/:id", validateToken, validateAdmin, async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findById(id);
    if (user) {
      res.status(200).json({ success: true, data: user });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/", async (req, res) => {
  const validateData = CreateUserSchema.safeParse(req.body);
  if (!validateData.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid data",
      errors: bodyValidation.error.issues.map((issues) => ({
        field: issues.path[0],
        message: issues.message,
      })),
    });
  }
  try {
    const newUser = new UserModel(validateData.data);
    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router.patch("/:id", validateToken, async (req, res) => {
  const paramsValidation = UserIdSchema.safeParse(req.params);
  if (!paramsValidation.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid user id",
      errors: paramsValidation.error.issues.map((issues) => ({
        field: issues.path[0],
        message: issues.message,
      })),
    });
  }
  const validateData = UpdateUserSchema.safeParse(req.body);
  if (!validateData.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid data",
      errors: validateData.error.errors,
    });
  }
  const id = req.params.id;
  try {
    const data = await UserModel.findByIdAndUpdate(id, validateData.data, {
      runValidators: true,
      new: true,
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router.delete("/:id", validateToken, async (req, res) => {
  const paramsValidation = DeleteUserSchema.safeParse({ id: req.params.id });
  if (!paramsValidation.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid user id",
      errors: paramsValidation.error.issues.map((issues) => ({
        field: issues.path[0],
        message: issues.message,
      })),
    });
  }
  const id = req.params.id;
  try {
    await UserModel.findByIdAndDelete(id);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
export default router;
