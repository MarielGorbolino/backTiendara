import express from "express";

import {
  registerController,
  loginController,
  renovarTokenController,
} from "../controller/userController.js";

import { postUsuario, postUsuarioLogin } from "../validations/userValidation.js";
import validationMiddleware from "../middleware/validationMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", postUsuario, validationMiddleware, registerController);
userRouter.post("/login", postUsuarioLogin, validationMiddleware, loginController);
userRouter.post("/token", renovarTokenController);

export default userRouter