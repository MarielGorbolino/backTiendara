import Category from "../model/categoryModel.js";
import Product from "../model/productsModel.js";
import { CategoryService } from "./categoryService.js";
import { ApiError } from "../utils/errors.js";
import Cart from "../model/cartModel.js";
import Detail from "../model/detailModel.js";

const cs = new CategoryService();
export class productsService {
  async getOne(id) {
    return await Product.findOne({ _id: id, status: true }).populate(
      "category",
      "name"
    );
  }

  async getAll() {
    return await Product.find({ status: true }).populate("category", "name");
  }

  async getAllProductsFiltradoandPaginado(search, sort, offset, limit) {
    const filtro = search ? { title: { $regex: search, $options: "i" }, status: true } : { status: true };

    let orden = {};
    if (sort === "price-asc") orden.price = 1;
    if (sort === "price-desc") orden.price = -1;
    if (sort === "name-asc") orden.title = 1;
    if (sort === "name-desc") orden.title = -1;

    const total = await Product.countDocuments(filtro);

    const data = await Product.find(filtro)
      .sort(orden)
      .skip(offset)
      .limit(limit);

    return {
      data,
      total,
      totalPages: Math.ceil(total / limit),
      page: offset / limit + 1,
      limit,
    };
  }

  async getAllProductsCategory(category) {
    const categorydb = await Category.findOne({ name: category, status: true });
    return await Product.find({
      category: categorydb?._id,
      status: true,
    }).populate("category", "name");
  }

  async create(
    title,
    price,
    description,
    images,
    category,
    stock,
    userId
  ) {
    const objectCaregory = await cs.getOne(category);
    if (!objectCaregory) {
      throw new ApiError("la categoria no existe", 404);
    }
    const producto = {
      title,
      price,
      description,
      images,
      stock,
      category: objectCaregory?._id,
      userId,
    };
    return await Product.create(producto);
  }

  async update(id, productoData) {
    const { title, price, description, images, category, stock } =
      productoData;

    const producto = {
      title,
      price,
      description,
      images,
      stock,
      category,
    };

    const productoActualizado = await Product.findByIdAndUpdate(id, {
      ...producto,
    });
    return productoActualizado;
  }

  async updateParcial(id, productoData) {
    let productoBase = await Product.findOne({ _id: id, status: true });
    if (!productoBase) {
      throw new ApiError("El producto no existe", 404);
    }
    const { title, price, description, images, category, stock } =
      productoData;
    const changedPrice = productoBase.price != price && price;
    const producto = {
      title: productoBase.title != title && title ? title : productoBase.title,
      price: changedPrice ? price : productoBase.price,
      description:
        productoBase.description != description && description
          ? description
          : productoBase.description,
      images:
        productoBase.images != images && images ? images : productoBase.images,
      stock: productoBase.stock != stock && stock ? stock : productoBase.stock,
      category:
        productoBase.category != category && category
          ? category
          : productoBase.category,
    };
    const productoActualizado = await Product.findByIdAndUpdate(
      productoBase._id,
      {
        ...producto,
      }
    );
    if (productoActualizado && changedPrice) {

      let detail = await Detail.findOne({ product: id });
      if (detail) {
        detail.price = price;
        await detail.save();
      }
    }
    return productoActualizado;
  }

  async deleteLogicoProduct(id) {
      const product = await Product.findOneAndUpdate({_id:id, status: true}, {
        status: false,
    });
    if(!product)
      throw new ApiError("El producto no existe", 404); 

  }
}
