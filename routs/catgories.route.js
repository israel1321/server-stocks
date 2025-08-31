import { Router } from "express";
import CategoryModel from "../models/category.model.js";
import {
  createCategorySchema,
  updateCategorySchema,
  updateCategoryParamsSchema,
  deleteCategorySchema,
} from "../zod/category.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const data = await CategoryModel.find();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("GET /categories error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/", async (req, res) => {
  const validateData = createCategorySchema.safeParse(req.body);
  if (!validateData.success) {
    return res.status(422).json({
      success: false,
      message: "Invalid data",
      errors: validateData.error.issues.map((issues) => ({
        field: issues.path[0],
        message: issues.message,
      })),
    });
  }
  const { category, category_code, image } = validateData.data;

  try {
    const newCategory = new CategoryModel({ category, category_code, image });
    await newCategory.save();
    res.status(201).json({ success: true, data: newCategory });
  } catch (error) {
    console.error("POST /categories error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put("/:category_code", async (req, res) => {
  const paramsValidation = updateCategoryParamsSchema.safeParse(req.params);
  if (!paramsValidation.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid parameters",
      errors: paramsValidation.error.issues.map((issues) => ({
        field: issues.path[0],
        message: issues.message,
      })),
    });
  }

  const bodyValidation = updateCategorySchema.safeParse(req.body);
  if (!bodyValidation.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid body",
      errors: bodyValidation.error.issues.map((issues) => ({
        field: issues.path[0],
        message: issues.message,
      })),
    });
  }

  const { category_code } = paramsValidation.data;
  const update = bodyValidation.data;
  try {
    const data = await CategoryModel.findOneAndUpdate(
      { category_code },
      update,
      { new: true }
    );
    if (!data) return res.status(404).json({ error: "Category not found" });
    res.json(data);
  } catch (error) {
    console.error("PUT /categories/:category_code error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete("/:category_code", async (req, res) => {
  const paramsValidation = deleteCategorySchema.safeParse(req.params);
  if (!paramsValidation.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid parameters",
      errors: bodyValidation.error.issues.map((issues) => ({
        field: issues.path[0],
        message: issues.message,
      })),
    });
  }

  try {
    const { category_code } = paramsValidation.data;
    const result = await CategoryModel.findOneAndDelete({ category_code });
    if (!result) return res.status(404).json({ error: "Category not found" });
    res.json({ message: "Category deleted" });
  } catch (error) {
    console.error("DELETE /categories/:category_code error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
