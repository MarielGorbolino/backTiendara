import { Router } from "express";
import { getOneProduct,getAllProducts,createOneProduct,updateOneProduct,deleteProduct,updateParcial,getAllProductsCategory, getAllProductsFiltradoandPaginado } from "../controller/productsController.js";
import { producto, patchProducto } from "../validations/productsValidation.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import {authMiddleware} from "../middleware/authMiddleware.js"

const productsRouter = Router()

productsRouter.get("/filter", getAllProductsFiltradoandPaginado)
productsRouter.get("/:id", getOneProduct) 
productsRouter.get("/category/:category", getAllProductsCategory)
productsRouter.get("/", getAllProducts)
productsRouter.post("/",authMiddleware,producto,validationMiddleware, createOneProduct)
productsRouter.put("/:id",authMiddleware, producto,validationMiddleware, updateOneProduct)
productsRouter.patch("/:id",authMiddleware, patchProducto,validationMiddleware, updateParcial)
productsRouter.delete("/:id",authMiddleware, deleteProduct)

export default productsRouter