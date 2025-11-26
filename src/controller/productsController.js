import { productsService } from "../service/productsService.js";
import { success } from "../utils/response.js"; 

const ps = new productsService();

export const getOneProduct = async (req, res,next) => {
  try {
    const { id } = req.params;

    const producto = await ps.getOne(id);
    success(res, producto)
  } catch (error) {
    next(error)
  }
};

export const getAllProducts = async (req, res,next) => {
  try {
    const productos = await ps.getAll();
    success(res, productos)
  } catch (error) {
    next(error)
  }
};

export const getAllProductsFiltradoandPaginado = async (req, res, next) => {
  try {
    const { search = "", sort = "" } = req.query;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const offset = (page - 1) * limit;

    const productos = await ps.getAllProductsFiltradoandPaginado(
      search,
      sort,
      offset,
      limit
    );

    success(res, productos);

  } catch (error) {
    next(error);
  }
};


export const getAllProductsCategory= async (req, res,next) => {
  try {
    const {category} = req.params
    const productos = await ps.getAllProductsCategory(category);
    success(res, productos)
  } catch (error) {
    next(error)
  }
};


export const createOneProduct = async (req, res,next) => {
  try {
    const { title, price, description, images, category, stock } = req.body;
    const productoCreado = await ps.create(
      title,
      price,
      description,
      images,
      category,
      stock,
      req.user.id
    );
    success(res, productoCreado, 201)
  } catch (error) {
    next(error)
  }
};

export const updateOneProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productoActualizado = await ps.update(
      id,
      req.body
    );

    success(res, productoActualizado)
  } catch (error) {
   next(error)
  }
};

export const updateParcial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productoActualizado = await ps.updateParcial(
      id,
      req.body
    );

    success(res, productoActualizado)
  } catch (error) {
   next(error)
  }
};

export const deleteProduct = async (req, res,next) => {
  try {
    const { id } = req.params;
    await ps.deleteLogicoProduct(id);
    success(res, {}, 204)
  } catch (error) {
    next(error)
  }
};
