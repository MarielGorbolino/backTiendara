import { Router } from "express";
import {getAllCarts, getOneCart,addProduct,removeOneProduct,removeProduct,ClearCart} from "../controller/cartController.js"
import { authMiddleware } from "../middleware/authMiddleware.js";
import { postCart } from "../validations/cartValidation.js";
import validationMiddleware from "../middleware/validationMiddleware.js";

const cartRouter = Router()

cartRouter.get("/",authMiddleware,getOneCart)
//cartRouter.get("/",getAllCarts)
cartRouter.post("/add",authMiddleware,postCart,validationMiddleware,addProduct)
cartRouter.post("/remove",authMiddleware,removeProduct)
cartRouter.post("/removeOne",authMiddleware,removeOneProduct)
cartRouter.post("/clear",authMiddleware,ClearCart)


export default cartRouter