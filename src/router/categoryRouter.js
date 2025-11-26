import { Router } from "express";
import { getAllCategory,createCategory,updateCategory,deleteCategory, getOneCategoryByName } from "../controller/categoryController.js";
import { category, patchCategory } from "../validations/categoryValidation.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const categoryRouter = Router()

categoryRouter.get("/:name",getOneCategoryByName)
categoryRouter.get("/",getAllCategory)
categoryRouter.post("/", authMiddleware,category,validationMiddleware,createCategory)
categoryRouter.put("/:id",authMiddleware,category, validationMiddleware,updateCategory)
categoryRouter.patch("/:id",authMiddleware,patchCategory, validationMiddleware,updateCategory)
categoryRouter.delete("/:id",authMiddleware,deleteCategory)

export default categoryRouter