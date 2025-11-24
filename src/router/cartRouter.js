import { Router } from "express";
import {getOneCart,removeProduct,ClearCart, deleteProductCart, addOneToCart} from "../controller/cartController.js"
import { authMiddleware } from "../middleware/authMiddleware.js";
import { postCart } from "../validations/cartValidation.js";
import validationMiddleware from "../middleware/validationMiddleware.js";

const cartRouter = Router()

cartRouter.get("/",authMiddleware,getOneCart)
cartRouter.post("/",authMiddleware,addOneToCart)
cartRouter.post("/remove",authMiddleware,removeProduct)
cartRouter.delete("/",authMiddleware,deleteProductCart)
// cartRouter.post("/add",authMiddleware,postCart,validationMiddleware,addProduct)
cartRouter.post("/clear",authMiddleware,ClearCart)


export default cartRouter