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

  async getAllPopulado() {
    const productos = await Product.find({ status: true }).populate(
      "category",
      "name"
    );
    return productos;
  }

  async getAllPaginado(page, limit, offset) {
    return await Product.find({ status: true })
      .populate("category", "name")
      .skip(offset)
      .limit(limit);
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

  async getAllProductsByName(name) {
    return await Product.find({ name: name, status: true });
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
    desciption,
    images,
    category,
    rate,
    count,
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
      desciption,
      images,
      stock,
      category: objectCaregory?._id,
      rating: {
        rate,
        count,
      },
      userId,
    };
    return await Product.create(producto);
  }

  async update(id, productoData) {
    const { title, price, desciption, images, category, rate, count, stock } =
      productoData;

    const producto = {
      title,
      price,
      desciption,
      images,
      stock,
      category,
      rating: {
        rate,
        count,
      },
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
    const { title, price, desciption, images, category, rate, count, stock } =
      productoData;
    const changedPrice = productoBase.price != price && price;
    const producto = {
      title: productoBase.title != title && title ? title : productoBase.title,
      price: changedPrice ? price : productoBase.price,
      desciption:
        productoBase.desciption != desciption && desciption
          ? desciption
          : productoBase.desciption,
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
      console.log(
        "Actualizando detalles con nuevo precio",
        productoActualizado,
        changedPrice
      );
      let detail = await Detail.findOne({ product: id });
      console.log("findOne detalles con nuevo precio", detail);
      if (detail) {
        detail.price = price;
        await detail.save();
        console.log("save detalles con nuevo precio");
      }
    }
    return productoActualizado;
  }

  async deleteLogicoProduct(id) {
    return await Product.findByIdAndUpdate(id, {
      status: false,
    });
  }
}
