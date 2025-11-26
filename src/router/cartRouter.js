import { Router } from "express";
import {getOneCart,removeProduct,clearCart, deleteProductCart, addOneToCart, paymentIntents, payCart} from "../controller/cartController.js"
import { authMiddleware } from "../middleware/authMiddleware.js";
import { oneProductCart } from "../validations/cartValidation.js";

const cartRouter = Router()

cartRouter.get("/",authMiddleware,getOneCart)
cartRouter.post("/",authMiddleware,oneProductCart,addOneToCart)
cartRouter.post("/remove",authMiddleware,oneProductCart, removeProduct)
cartRouter.post("/pay",authMiddleware,payCart)
cartRouter.delete("/",authMiddleware, clearCart)
cartRouter.post("/clear",authMiddleware, deleteProductCart)
cartRouter.post("/create-payment-intent",authMiddleware,paymentIntents)

export default cartRouter