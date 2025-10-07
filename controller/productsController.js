import { productsService } from "../service/productsService.js";
import { validationResult } from "express-validator";

//responsable de quitar las variables de la peticion y preparar la salida
const ps = new productsService();

export const getOneProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const producto = await ps.getOne(id);
    res.status(200).json({
      mensage: "Success",
      code: 200,
      data: producto,
    });
  } catch (error) {
    res.status(500).json({
      mensage: "Error",
      code: 500,
      data: error,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const productos = await ps.getAll();
    res.status(200).json({
      mensage: "Success",
      code: 200,
      data: productos,
    });
  } catch (error) {
    res.status(500).json({
      mensage: "Error",
      code: 500,
      data: error,
    });
  }
};

export const getAllProductsPaginado = async (req, res) => {
  try {
    const {page = 1, limit = 10} = req.query
    const offset = (page - 1) * limit
    const productos = await ps.getAllPaginado(page,limit,offset);
    res.status(200).json({
      mensage: "Success",
      code: 200,
      data: productos,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      mensage: "Error",
      code: 500,
      data: error,
    });
  }
};

export const getAllProductsFiltrado = async (req, res) => {
  try {
    const {name, pmin,pmax,sortby,order} = req.query
    const productos = await ps.getAllFiltrado(name,pmin,pmax,sortby,order);
    res.status(200).json({
      mensage: "Success",
      code: 200,
      data: productos,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      mensage: "Error",
      code: 500,
      data: error,
    });
  }
};

export const createOneProduct = async (req, res) => {
  try {
    const { title, price, description, image, category, rate, count, stock } =
      req.body;
console.log(req.body  )
    const productoCreado = await ps.create(
      title,
      price,
      description,
      image,
      category,
      rate,
      count,
      stock
    );
    res.status(201).json({
      mensage: "Success",
      code: 201,
      data: productoCreado,
    });
  } catch (error) {
    res.status(500).json({
      mensage: "Error",
      code: 500,
      data: error,
    });
  }
};

export const updateOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, desciption, image, category, rate, count, stock } =
      req.body;

    const productoActualizado = await ps.update(
      id,
      title,
      price,
      desciption,
      image,
      category,
      rate,
      count,
      stock
    );

    res.status(200).json({
      mensage: "Success",
      code: 200,
      data: productoActualizado,
    });
  } catch (error) {
    res.status(500).json({
      mensage: "Error",
      code: 500,
      data: error,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productoEliminado = await ps.deleteLogicoProduct(id);

    res.status(200).json({
      mensage: "Success",
      code: 200,
      data: productoEliminado,
    });
  } catch (error) {
    res.status(500).json({
      mensage: "Error",
      code: 500,
      data: error,
    });
  }
};
