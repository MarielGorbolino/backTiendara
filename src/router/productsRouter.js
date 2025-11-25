import { Router } from "express";
import { getOneProduct,getAllProducts,createOneProduct,updateOneProduct,deleteProduct,updateParcial,getAllProductsCategory, getAllProductsFiltradoandPaginado } from "../controller/productsController.js";
import { postProducto,defaultValidation } from "../validations/productsValidation.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import {authMiddleware} from "../middleware/authMiddleware.js"

const productsRouter = Router()

productsRouter.get("/filter",defaultValidation,validationMiddleware, getAllProductsFiltradoandPaginado)
productsRouter.get("/:id",defaultValidation,validationMiddleware, getOneProduct) 
productsRouter.get("/category/:category", getAllProductsCategory)
productsRouter.get("/",defaultValidation,validationMiddleware, getAllProducts)
productsRouter.post("/",authMiddleware,postProducto,validationMiddleware, createOneProduct)
productsRouter.put("/:id",defaultValidation,validationMiddleware, updateOneProduct)
productsRouter.patch("/:id",defaultValidation,validationMiddleware, updateParcial)
productsRouter.delete("/:id",defaultValidation,validationMiddleware, deleteProduct)

export default productsRouter