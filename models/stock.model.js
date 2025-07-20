import mongoose from "mongoose";
const StockSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  category_code: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  stock: {
    type: Number,
  },
  image_url: {
    type: String,
  },
  description: {
    type: String,
  },
});
const StockModel = mongoose.model("stocks", StockSchema);
export default StockModel;
