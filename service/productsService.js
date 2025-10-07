import Product from "../model/productsModel.js";
import { CategoryService } from "./categoryService.js";

const cs = new CategoryService();
export class productsService {
  async getOne(id) {
    return await Product.findById(id);
  }

  async getAll() {
    return await Product.find().populate("categoryId").exec();
  }

  async getByCategory(name) {
    const objectCaregory = await cs.getOneByName(name);
    return await Product.find({ categoryId:objectCaregory._id }).populate("categoryId").exec();
  }

  async create(name, price, description, image, categoryId, rate, count, stock, active=true) {
    const objectCaregory = await cs.getOne(categoryId);
    if(!objectCaregory){
      throw new Error("Categoria no encontrada")
    }
    const producto = {
      name,
      price,
      description,
      image,
      stock,
      active,
      categoryId: objectCaregory._id
    }
    return await Product.create(producto);
  }

  async update(id,title, price, description, image, category, rate, count, stock) {
    const producto = {
      title,
      price,
      description,
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
  // borrado fisico o logico
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
