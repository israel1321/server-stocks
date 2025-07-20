import path from "path";
import fs from "fs/promises";
import CategoryModel from "../models/category.model.js";
import StockModel from "../models/stock.model.js";

export async function uploadMockData() {
  try {
    const dataDir = path.resolve("./data");

    // Read categories
    const categoriesPath = path.join(dataDir, "categories.json");
    const itemsPath = path.join(dataDir, "stocks.json");
    const categoriesRaw = await fs.readFile(categoriesPath, "utf-8");
    const itemsRaw = await fs.readFile(itemsPath, "utf-8");
    let categories = JSON.parse(categoriesRaw);
    let items = JSON.parse(itemsRaw);

    // Remove 'id' property and ensure categoryCode is lowercase
    categories = categories.map(({ id, ...rest }) => ({
      ...rest,
    }));
    items = items.map(({ id, ...rest }) => ({
      ...rest,
    }));

    // Overwrite collections
    await CategoryModel.deleteMany({});
    await StockModel.deleteMany({});
    await CategoryModel.insertMany(categories);
    await StockModel.insertMany(items);

    console.log("Mock data uploaded to MongoDB.");
  } catch (err) {
    console.error("Error uploading mock data:", err);
  }
}
