import { Router } from "express";
import { getOneCategory,getAllCategory,createCategory,updateCategory,deleteCategory, getOneCategoryByName } from "../controller/categoryController.js";
//responsable del ruteo (funciones del controller) + ejecutar middlewares
const categoryRouter = Router()

categoryRouter.get("/:id",getOneCategory)

categoryRouter.get("/:name",getOneCategoryByName)

categoryRouter.get("/",getAllCategory)

categoryRouter.post("/", createCategory)

categoryRouter.put("/:id",updateCategory)

categoryRouter.delete("/:id",deleteCategory)

export default categoryRouter