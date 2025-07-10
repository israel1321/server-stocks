import mongoose from "mongoose";
const StockModel = new mongoose.Schema({
   prodact_name:String,
   category:String,
   price:Number,
   stock:Number,
   image_url:String,
   description:String,
});
const Stock = mongoose.model("stocks", StockModel);
export default Stock;