import { Router } from "express";
import StockModel from "../models/stock.model.js";
import { validateToken } from "../middlewares/tokenValidation.js";
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

// stocks/user
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
  try {
    const {
      product_name,
      category_code,
      price,
      stock,
      image_url,
      description,
      location,
    } = req.body;
    const item = new StockModel({
      product_name,
      category_code,
      price,
      stock,
      image_url,
      description,
      location,
      user_id: req.user.id,
    });
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    const data = await StockModel.findByIdAndUpdate(id, update, {
      new: true,
    });
    if (!data) return res.status(404).json({ error: "Product not found" });

    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
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
