import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  category_code: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
});
const CategoryModel = mongoose.model("categories", CategorySchema);
export default CategoryModel;
