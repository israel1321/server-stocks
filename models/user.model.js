import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  number_phone: {
   type: String,
   required: true,
   unique: true,
    match: [/^\d{10}$/, 'Phone number must be exactly 10 digits']
    

  },
  role: {
    type: String,
    default: "user",
  },
});
const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
