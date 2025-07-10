import mongoose from "mongoose";
   
try{
    await mongoose.connect("mongodb://localhost:27017/stocks");
    console.log("mongo connected");
}catch(error){
    console.log(error);
}