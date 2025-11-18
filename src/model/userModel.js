import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  name: {
    type: String,
    require: true,
    default: "alo",
  },
  lastName: {
    type: String,
    require: true,
    default: "alo",
  },
  birthdate: {
    type: Date,
    require: true,
  },
});

const Usuario = mongoose.model("User", userSchema)

export default Usuario