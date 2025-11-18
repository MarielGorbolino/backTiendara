import { CategoryService } from "../service/categoryService.js";
import { success } from "../utils/response.js";

const cs = new CategoryService();

export const getOneCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await cs.getOne(id);
    success(res, category)
  } catch (error) {
    next(error)
  }
};

export const getOneCategoryByName = async (req, res, next) => {
  try {
    const { name } = req.params;

    const category = await cs.getOneByName(name);
    success(res, category)

  } catch (error) {
    next(error)
  }
};

export const getAllCategory = async (req, res, next) => {
  try {
    const categories = await cs.getAll();
    success(res, categories)
  } catch (error) {
    next(error)
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name, description, image } = req.body;
    const category = await cs.create(name, description, image);
    success(res, category)
  } catch (error) {
    next(error)
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, image, status } = req.body;
    const category = await cs.update(id, name, description, image, status);
    success(res, category)
  } catch (error) {
    next(error)
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await cs.delete(id);
    success(res, category)
  } catch (error) {
    next(error)
  }
};
