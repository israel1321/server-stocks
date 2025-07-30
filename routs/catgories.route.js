import { Router } from "express";
import CategoryModel from "../models/category.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const data = await CategoryModel.find();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("GET /categories error:", error); // error log
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { category, category_code, image } = req.body;
    const newCategory = new CategoryModel({ category, category_code , image});
    await newCategory.save();
    res.status(201).json({ success: true, data: newCategory });
  } catch (error) {
    console.error("POST /categories error:", error); // error log
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put("/:category_code", async (req, res) => {
  const { category_code } = req.params;
  const update = req.body;
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
  try {
    const { category_code } = req.params;
    const result = await CategoryModel.findOneAndDelete({ category_code });
    if (!result) return res.status(404).json({ error: "Category not found" });
    res.json({ message: "Category deleted" });
  } catch (error) {
    console.error("DELETE /categories/:category_code error:", error); // error log
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
