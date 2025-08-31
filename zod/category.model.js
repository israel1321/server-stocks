import { z } from "zod";

export const category_code_schema = z
  .string()
  .min(4, "Category code must be at least 4 characters long");

export const createCategorySchema = z.object({
  category: z.string().min(4),
  category_code: category_code_schema,
  image: z.string(),
});

export const updateCategorySchema = z.object({
  category: z.string().min(4).optional(),
  category_code: category_code_schema.optional(),
  image: z.string().optional(),
});

export const updateCategoryParamsSchema = z.object({
  category_code: category_code_schema,
});

export const deleteCategorySchema = z.object({
  category_code: category_code_schema,
});
