import { Router } from "express";
import UserModel from "../models/user.model.js";
import {
  validateAdmin,
  validateToken,
} from "../middlewares/tokenValidation.js";

const router = Router();

router.get("/", validateToken, validateAdmin, async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/:id", validateToken, validateAdmin, async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findById(id);
    if (user) {
      res.status(200).json({ success: true, data: user });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router.post("/",async(req,res)=>{
  try{
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.status(201).json({success:true,data:newUser});
  }
  catch(error){
    res.status(500).json({success:false,message:error.message});
  }
});
router.patch("/:id",validateToken,async(req,res)=>{
  const id = req.params.id;
  try{
    const data = await UserModel.findByIdAndUpdate(id,req.body,{runValidators:true,new:true});
    res.status(200).json({success:true,data});
  }
  catch(error){
    res.status(500).json({success:false,message:error.message});
  }
});
 router.delete("/:id",validateToken,async(req,res)=>{
  const id = req.params.id;
  try{
    await UserModel.findByIdAndDelete(id);
    res.status(200).json({success:true});
  }
  catch(error){
    res.status(500).json({success:false,message:error.message});
  }
});
export default router;
