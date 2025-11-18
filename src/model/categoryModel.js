import mongoose from "mongoose";
const { Schema, model } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  status: { type: Boolean, default: true },
});

const Category = model("Category", categorySchema);
export default Category;
