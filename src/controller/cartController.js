import { logger } from "../config/Winston.js";
import { CartService } from "../service/cartService.js";
import { success } from "../utils/response.js";

const cartService = new CartService()

export const getOneCart = async (req, res, next) => {
  try {
    const user = req.user;
    const cart = await cartService.getOne(user.id);
    success(res, cart)
  } catch (error) {
    next(error)

  }
};

export const getAllCarts = async (req, res, next) => {
  try {
    const carts = await cartService.getAllCarts();
    success(res, carts)
    res.status(200).json({
      mensage: "Success",
      code: 200,
      data: carts,
    });
  } catch (error) {
    next(error)

  }
};

export const addProduct = async (req, res, next) => {
  try {
    const user = req.user;
    const {detalle} = req.body
    const cart = await cartService.addProduct(user.id, detalle.product, detalle.quantity);
    success(res, cart)
  } catch (error) {
    console.log(error)
    next(error)

  }
};

export const removeProduct = async (req, res, next) => {
  try {
    const user = req.user;
    const {idProducto} = req.body
    const cart = await cartService.removeProduct(user.id, idProducto);
    success(res, cart)
  } catch (error) {
    next(error)

  }
};

export const removeOneProduct = async (req, res, next) => {
  try {
    const user = req.user;
    const {idProducto} = req.body
    const cart = cartService.removeOneProduct(user.id,idProducto);
    success(res, cart)
  } catch (error) {
    next(error)

  }
};

export const ClearCart = async (req, res, next) => {
  try {
    const user = req.user;
    const cart = await cartService.ClearCart(user.id);
    success(res, cart)
  } catch (error) {
    next(error)

  }
};
