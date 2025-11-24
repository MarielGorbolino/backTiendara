import Cart from "../model/cartModel.js";
import Detail from "../model/detailModel.js";
import Product from "../model/productsModel.js";
import { ApiError } from "../utils/errors.js";
import { productsService } from "./productsService.js";
const ps = new productsService();

export class CartService {
  constructor() {
  }
  async getOne(idUsuario) {
    const cart = await Cart.findOne({ userId: idUsuario }).populate({
      path: "detalle",
      populate: "product",
    });
    return cart;
  }

  async getAllCarts() {
    const cart = await Cart.find().populate({
      path: "detalle",
      populate: "product",
    });
    return cart;
  }

  async deleteProductCart(idUsuario, idProducto) {
    // Buscar carrito
    const cart = await Cart.findOne({ userId: idUsuario });
    if (!cart) throw new Error("carrito no encontrado");

    // Buscar el detalle del producto
    const detail = await Detail.findOne({
      product: idProducto,
      _id: { $in: cart.detalle },
    });

    if (!detail) throw new Error("producto no encontrado en el carrito");

    // Recuperar stock
    const product = await Product.findById(idProducto);
    if (product) {
      product.stock += detail.quantity;
      await product.save();
    }

    // Eliminar el detalle
    await Detail.findByIdAndDelete(detail._id);

    // Removerlo del array del carrito
    cart.detalle = cart.detalle.filter(
      (id) => id.toString() !== detail._id.toString()
    );

    // Si el carrito no tiene más productos → eliminar carrito
    if (cart.detalle.length === 0) {
      await Cart.findByIdAndDelete(cart._id);
      return { message: "Producto eliminado y carrito vacío eliminado" };
    }

    // Guardar cambios si el carrito aún tiene productos
    await cart.save();

    return await this.getOne(idUsuario);
  }

  async addOneToCart(idUsuario, productId) {
    const product = await Product.findById({ _id: productId });
    if (!product) throw new ApiError("producto no encontrado", 404);

    if (product.stock <= 0)
      throw new ApiError("producto sin stock disponible", 409);

    let cart = await Cart.findOne({ userId: idUsuario });
    if (!cart) {
      cart = await Cart.create({ userId: idUsuario });
    }

    // Buscar si ya existe un detail para ese producto
    const detail = await Detail.findOne({
      product: productId,
      _id: { $in: cart.detalle },
    });

    // Siempre SUMA 1
    const newQuantity = detail ? detail.quantity + 1 : 1;

    // Restar stock por UNIDAD agregada
    product.stock -= 1;
    await ps.update(product.id, product);

    if (!detail) {
      // Crear un detail nuevo
      const newDetail = await Detail.create({
        product: productId,
        quantity: newQuantity,
        price: product.price,
      });

      cart.detalle.push(newDetail._id);
      await cart.save();
    } else {
      // Actualizar detail existente
      detail.quantity = newQuantity;
      detail.price = product.price;
      await detail.save();
    }

    return await this.getOne(idUsuario);
  }

  async removeProduct(idUsuario, idProducto) {
    // Buscar carrito
    const cart = await Cart.findOne({ userId: idUsuario });
    if (!cart) throw new Error("carrito no encontrado");

    // Buscar detalle que contenga ese producto
    const detail = await Detail.findOne({
      product: idProducto,
      _id: { $in: cart.detalle },
    });

    if (!detail) {
      throw new Error("producto no encontrado en el carrito");
    }

    // Buscar el producto real para devolver stock
    const product = await Product.findById(idProducto);
    if (!product) throw new Error("producto no encontrado");

    // 👉 Devolver 1 unidad al stock
    product.stock += 1;
    await product.save();

    // 👉 Si la cantidad queda en 0, eliminar el detalle y quitarlo del carrito
    if (detail.quantity <= 1) {
      await Detail.findByIdAndDelete(detail._id);

      cart.detalle = cart.detalle.filter(
        (id) => id.toString() !== detail._id.toString()
      );
      await cart.save();
    } else {
      // 👉 Si queda más de 1, solo restar uno
      detail.quantity -= 1;
      await detail.save();
    }

    // 👉 Si el carrito quedó vacío, eliminarlo
    if (cart.detalle.length === 0) {
      await Cart.findByIdAndDelete(cart._id);
      return { message: "carrito eliminado porque quedó vacío" };
    }

    return await this.getOne(idUsuario);
  }

  async ClearCart(idUsuario) {
    const cart = await Cart.findOne({ userId: idUsuario });
    if (!cart) throw new Error("carrito no encontrado");

    await Detail.deleteMany({ _id: { $in: cart.detalle } });
    cart.detalle = [];
    await cart.save();

    return await this.getOne(idUsuario);
  }
}
