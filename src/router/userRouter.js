import express from "express";

import {
  registerController,
  loginController,
  renovarTokenController,
  getUser,
  updateUser,
  deleteUser,
} from "../controller/userController.js";

import { postUsuario, postUsuarioLogin } from "../validations/userValidation.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", postUsuario, validationMiddleware, registerController);
userRouter.post("/login", postUsuarioLogin, validationMiddleware, loginController);
userRouter.post("/token", renovarTokenController);
userRouter.get("/", authMiddleware, getUser);
userRouter.put("/", authMiddleware, updateUser);
userRouter.delete("/", authMiddleware, deleteUser);

export default userRouter