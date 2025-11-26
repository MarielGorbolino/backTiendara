import mongoose from "mongoose";
const { Schema, model } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  status: { type: Boolean, default: true },
});

const Category = model("Category", categorySchema);
export default Category;
