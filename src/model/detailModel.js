import mongoose from "mongoose";
const { Schema } = mongoose;

const detailSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", require: true },
  quantity: { type: Number, require: true, default: 1 },
  price: { type: Number, require: true },
});
const Detail = mongoose.model("Detail", detailSchema);
export default Detail;
