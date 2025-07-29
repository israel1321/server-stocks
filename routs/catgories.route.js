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
    const { category, category_code } = req.body;
    const newCategory = new CategoryModel({ category, category_code });
    await newCategory.save();
    res.status(201).json({ success: true, data: newCategory });
  } catch (error) {
    console.error("POST /categories error:", error); // error log
    res.status(500).json({ success: false, message: error.message });
  }
});

router.patch("/:categoryCode", async (req, res) => {
  const { category } = req.params;
  const update = req.body;
  try {
    const data = await CategoryModel.findByIdAndUpdat(
      { categoryCode },
      update,
      { new: true }
    );
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json(category);
  } catch (error) {
    console.error("PATCH /categories/:categoryCode error:", error); // error log
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete("/:categoryCode", async (req, res) => {
  try {
    const { categoryCode } = req.params;
    await CategoryModel.findOneAndDelete({ categoryCode });
    if (!result) return res.status(404).json({ error: "Category not found" });
    res.json({ message: "Category deleted" });
  } catch (error) {
    console.error("DELETE /categories/:categoryCode error:", error); // error log
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
