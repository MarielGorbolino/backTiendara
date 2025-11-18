import { Router } from "express";
import { getOneCategory,getAllCategory,createCategory,updateCategory,deleteCategory, getOneCategoryByName } from "../controller/categoryController.js";
import { postCategory } from "../validations/categoryValidation.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const categoryRouter = Router()

categoryRouter.get("/:id",getOneCategory)
categoryRouter.get("/:name",getOneCategoryByName)
categoryRouter.get("/",getAllCategory)
categoryRouter.post("/", authMiddleware,postCategory,validationMiddleware,createCategory)
categoryRouter.put("/:id",updateCategory)
categoryRouter.delete("/:id",deleteCategory)

export default categoryRouter