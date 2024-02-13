import mongoose from "mongoose";
const Register = new mongoose.Schema({
  email: { type: String, required: true },
  mobile: { type: Number, required: true },
  password: { type: String, required: true },
});
const registerSchema = mongoose.model("registers", Register);
export default registerSchema;
