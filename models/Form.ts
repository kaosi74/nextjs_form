import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

export default mongoose.model("Form", FormSchema);
