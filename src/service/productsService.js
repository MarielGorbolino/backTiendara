import Category from "../model/categoryModel.js";
import Product from "../model/productsModel.js";
import { CategoryService } from "./categoryService.js";
import { ApiError } from "../utils/errors.js";

const cs = new CategoryService();
export class productsService {
  async getOne(id) {
    return await Product.findById({_id : id }).populate("category","name");
  }

  async getAll() {
    return await Product.find({status : true }).populate("category","name");
  }

  async getAllPopulado() {
    const productos = await Product.find().populate("category","name");
    return productos;
  }

  async getAllPaginado(page,limit,offset){
    const productos = await Product.find().populate("category","name").skip(offset).limit(limit);
    return productos;
  }

  async getAllFiltrado(name){
    return await Product.find({name: name});
  }

  async getAllProductsCategory(category){
    const categorydb = await Category.findOne({name: category})
    let productos = await Product.find({category: categorydb?._id}).populate("category","name");
    if(!productos || productos.length === 0){
      productos = await Product.find().populate("category","name");
    }
    return productos;
  }

  async create(title, price, desciption, image, category, rate, count, stock, userId) {
    console.log("categoryId en service:", category);  
    const objectCaregory = await cs.getOne(category);
    if(!objectCaregory){
      throw new ApiError("la categoria no existe", 404);
    } 
    const producto = {
      title,
      price,
      desciption,
      image,
      stock,
      category: objectCaregory?._id,
      rating: {
        rate,
        count,
      },
      userId
    };
    return await Product.create(producto);
  }

  async update(id,title, price, desciption, image, category, rate, count, stock) {
    const producto = {
      title,
      price,
      desciption,
      image,
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
  async deleteLogicoProduct(id) {
    const productoEliminado = await Product.findByIdAndUpdate(id, {
      status: false,
    });
    return productoEliminado;
  }
  /*
  async deleteFisicoProduct(id) {
    const productoEliminado = await Product.deleteOne({id:id})

    return productoEliminado
  }*/
}
