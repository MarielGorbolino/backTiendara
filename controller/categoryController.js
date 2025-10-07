import { CategoryService } from "../service/categoryService.js";

const cs = new CategoryService();

export const getOneCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await cs.getOne(id);
    res.status(200).json({
      mensage: "Success",
      code: 200,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      mensage: "Error",
      code: 500,
      data: error,
    });
  }
};

export const getOneCategoryByName = async (req, res) => {
  try {
    console.log(name);

    const { name } = req.params;

    const category = await cs.getOneByName(name);

    res.status(200).json({
      mensage: "Success",
      code: 200,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      mensage: "Error",
      code: 500,
      data: error,
    });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const categories = await cs.getAll();
    res.status(200).json({
      mensage: "Success",
      code: 200,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      mensage: "Error",
      code: 500,
      data: error,
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const category = await cs.create(name, description, image);
    res.status(200).json({
      mensage: "Success",
      code: 200,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      mensage: "Error",
      code: 500,
      data: error,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image, status } = req.body;
    const category = await cs.update(id, name, description, image, status);
    res.status(200).json({
      mensage: "Success",
      code: 200,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      mensage: "Error",
      code: 500,
      data: error,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await cs.delete(id);
    res.status(200).json({
      mensage: "Success",
      code: 200,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      mensage: "Error",
      code: 500,
      data: error,
    });
  }
};
