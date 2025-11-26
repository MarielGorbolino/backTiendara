import { Router } from "express";
import {getOneCart,removeProduct,clearCart, deleteProductCart, addOneToCart, paymentIntents, payCart} from "../controller/cartController.js"
import { authMiddleware } from "../middleware/authMiddleware.js";

const cartRouter = Router()

cartRouter.get("/",authMiddleware,getOneCart)
cartRouter.post("/",authMiddleware,addOneToCart)
cartRouter.post("/remove",authMiddleware,removeProduct)
cartRouter.post("/pay",authMiddleware,payCart)
cartRouter.delete("/",authMiddleware,deleteProductCart)
cartRouter.post("/clear",authMiddleware,clearCart)
cartRouter.post("/create-payment-intent",authMiddleware,paymentIntents)

export default cartRouter