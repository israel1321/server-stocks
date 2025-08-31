import { z } from "zod";
import { category_code_schema } from "./category.model.js";

export const CreateStockSchema = z.object({
  product_name: z.string().min(2, "Product name is required"),
  category_code: category_code_schema,
  price: z.number().min(0, "Price must be a positive number"),
  stock: z.number().min(0, "Stock must be a positive number"),
  image_url: z.string().min(2, "Image URL is required"),
  description: z.string().min(2, "Description is required"),
  location: z.string().min(2, "Location is required"),
  user_id: z.string().length(24, "Invalid user id"),
});

export const UpdateStockSchema = z.object({
  product_name: z.string().min(2).optional(),
  category_code: category_code_schema.optional(),
  price: z.number().min(0).optional(),
  stock: z.number().min(0).optional(),
  image_url: z.string().min(2).optional(),
  description: z.string().min(2).optional(),
  location: z.string().min(2).optional(),
  user_id: z.string().length(24).optional(),
});

export const DeleteStockSchema = z.object({
  id: z.string().length(24, "Invalid stock id"),
});

export const StockIdSchema = z.object({
  id: z.string().length(24, "Invalid stock id"),
});
