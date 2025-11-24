import { Router } from "express";
import { getOneProduct,getAllProducts,createOneProduct,updateOneProduct,deleteProduct,updateParcial,getAllProductsPaginado,getAllProductsFiltrado,getAllProductsPopulado,getAllProductsCategory } from "../controller/productsController.js";
import { postProducto,defaultValidation } from "../validations/productsValidation.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import {authMiddleware} from "../middleware/authMiddleware.js"

const productsRouter = Router()

productsRouter.get("/paginado/",defaultValidation,validationMiddleware, getAllProductsPaginado)
productsRouter.get("/filtrado/",defaultValidation,validationMiddleware, getAllProductsFiltrado)
productsRouter.get("/populado",defaultValidation,validationMiddleware, getAllProductsPopulado)
productsRouter.get("/:id",defaultValidation,validationMiddleware, getOneProduct) 
productsRouter.get("/category/:category", getAllProductsCategory)
productsRouter.get("/",defaultValidation,validationMiddleware, getAllProducts)
productsRouter.post("/",authMiddleware,postProducto,validationMiddleware, createOneProduct)
productsRouter.put("/:id",defaultValidation,validationMiddleware, updateOneProduct)
productsRouter.patch("/:id",defaultValidation,validationMiddleware, updateParcial)
productsRouter.delete("/:id",defaultValidation,validationMiddleware, deleteProduct)

export default productsRouter