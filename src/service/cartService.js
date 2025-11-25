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
    // const product = await Product.findById(idProducto);
    // if (product) {
    //   product.stock += detail.quantity;
    //   await product.save();
    // }

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

    let cart = await Cart.findOne({ userId: idUsuario });
    if (!cart) {
      cart = await Cart.create({ userId: idUsuario });
    }

    const detail = await Detail.findOne({
      product: productId,
      _id: { $in: cart.detalle },
    });

    const newQuantity = detail ? detail.quantity + 1 : 1;
    if (product.stock < newQuantity)
      throw new ApiError("producto sin stock disponible", 409);

    if (!detail) {
        const newDetail = await Detail.create({
        product: productId,
        quantity: newQuantity,
        price: product.price,
      });

      cart.detalle.push(newDetail._id);
      await cart.save();
    } else {
      detail.quantity = newQuantity;
      detail.price = product.price;
      await detail.save();
    }

    return await this.getOne(idUsuario);
  }

  async removeProduct(idUsuario, idProducto) {
    const cart = await Cart.findOne({ userId: idUsuario });
    if (!cart) throw new Error("carrito no encontrado");

    const detail = await Detail.findOne({
      product: idProducto,
      _id: { $in: cart.detalle },
    });

    if (!detail) {
      throw new Error("producto no encontrado en el carrito");
    }

    const product = await Product.findById(idProducto);
    if (!product) throw new Error("producto no encontrado");


    if (detail.quantity <= 1) {
      await Detail.findByIdAndDelete(detail._id);

      cart.detalle = cart.detalle.filter(
        (id) => id.toString() !== detail._id.toString()
      );
      await cart.save();
    } else {
      detail.quantity -= 1;
      await detail.save();
    }

    if (cart.detalle.length === 0) {
      await Cart.findByIdAndDelete(cart._id);
      return { message: "carrito eliminado porque quedó vacío" };
    }

    return await this.getOne(idUsuario);
  }

  async ClearCart(idUsuario) {
  const cart = await Cart.findOne({ userId: idUsuario }).populate('detalle');
  if (!cart) throw new Error("carrito no encontrado");

  if (cart.detalle && cart.detalle.length > 0) {

    for (const detail of cart.detalle) {
      const product = await Product.findById(detail.product);

      if (product) {
        product.stock -= detail.quantity;
        await product.save();
      }
    }
  }

  await Detail.deleteMany({ _id: { $in: cart.detalle.map(d => d._id) } });

  cart.status = "Pagado";
  await cart.save();

  return await this.getOne(idUsuario);
}
}
