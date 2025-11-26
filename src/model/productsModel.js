import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, default: "" },
  images: [{ type: String }],
  stock: { type: Number, default: 20 },

  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: Boolean, default: true },
});

const Product = model("Product", productSchema);
export default Product;
