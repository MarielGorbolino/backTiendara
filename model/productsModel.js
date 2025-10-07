import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  stock: { type: Number, default: 20 },

  categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },

  rating: {
    rate: Number,
    count: Number,
  },
  active: { type: Boolean, default: true },
});

const Product = model("Product", productSchema);
export default Product;
