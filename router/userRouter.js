import express from "express";

import {
  registerController,
  loginController,
  renovarTokenController,
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerController);
userRouter.post("/login", loginController);
userRouter.post("/token", renovarTokenController);

export default userRouter