import { Router } from "express";
import StockModel from "../models/stock.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const data = await StockModel.find();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

 
 router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try{
    const data = await StockModel.findById( id);
    if(data){
      res.status(200).json({ success: true, data });
    }else{
      res.status(404).json({ success: false, message: "Stock not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/", async (req,res) =>{
  try{
  const newStock = new StockModel(req.body);
  await newStock.save();
  res.status(201).json({ success: true, data: newStock });
  }catch(error){
    res.status(500).json({ success: false, message: error.message });
  }
});

 router.patch("/:id",async(req,res) => {
  const  id = req.params.id;
  try{
    const data = await StockModel.findByIdAndUpdate(id,req.body,{runValidators:true ,new:true});
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
 });

 router.delete("/:id",async(req,res) =>{
  const id = req.params.id;
  try{
      await StockModel.findByIdAndDelete(id);
      res.status(200).json({sucsses:true})
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
 });

export default router;
