import { Router } from "express";
import StockModel from "../models/stock.model.js";
import { validateToken } from "../middlewares/tokenValidation.js";
import {
  CreateStockSchema,
  UpdateStockSchema,
  DeleteStockSchema,
  StockIdSchema,
} from "../zod/stocks.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { name = "", category = "", min = 0, max = Infinity } = req.query;

    const item = await StockModel.find({
      product_name: new RegExp(name, "i"),
      category_code: new RegExp(category, "i"),
      price: { $gte: min, $lte: max },
    });
    res.json(item);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/user", validateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await StockModel.find({ user_id: userId });

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Products not found" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const paramsValidation = StockIdSchema.safeParse(req.params);
  if (!paramsValidation.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid stock id",
      errors: bodyValidation.error.issues.map((issues) => ({
        field: issues.path[0],
        message: issues.message,
      })),
    });
  }
  try {
    const data = await StockModel.findOne({ _id: req.params.id }).populate(
      "user_id"
    );

    if (!data) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/", validateToken, async (req, res) => {
  const validateData = CreateStockSchema.safeParse({
    ...req.body,
    user_id: req.user.id,
  });
  if (!validateData.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid data",
      errors: validateData.error.issues.map((issues) => ({
        field: issues.path[0],
        message: issues.message,
      })),
    });
  }
  try {
    const item = new StockModel(validateData.data);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const paramsValidation = StockIdSchema.safeParse(req.params);
  if (!paramsValidation.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid stock id",
      errors: paramsValidation.error.issues.map((issues) => ({
        field: issues.path[0],
        message: issues.message,
      })),
    });
  }
  const validateData = UpdateStockSchema.safeParse(req.body);
  if (!validateData.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid data",
      errors: validateData.error.issues.map((issues) => ({
        field: issues.path[0],
        message: issues.message,
      })),
    });
  }
  try {
    const { id } = req.params;
    const update = validateData.data;

    const data = await StockModel.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });
    if (!data) return res.status(404).json({ error: "Product not found" });

    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const paramsValidation = DeleteStockSchema.safeParse({ id: req.params.id });
  if (!paramsValidation.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid stock id",
      errors: paramsValidation.error.issues.map((issues) => ({
        field: issues.path[0],
        message: issues.message,
      })),
    });
  }
  try {
    const { id } = req.params;
    const result = await StockModel.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
