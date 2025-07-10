import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
 name:{
    type:String,
    required:true,
 },
 email: {
    type:String,
    required:true,
    unique:true,
 },
  password:{
    type:String,
    required:true,
 },
  role:{
    type:String,
    default:"user",

 }
});
const User = mongoose.model("users", UserModel);

export default User;