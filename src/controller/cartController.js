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


export const addOneToCart = async (req, res, next) => {
  try {
    const user = req.user;
    const {idProducto} = req.body
    const cart = await cartService.addOneToCart(user.id, idProducto);
    success(res, cart)
  } catch (error) {
    next(error)

  }
};

export const deleteProductCart = async (req, res, next) => {
  try {
    const user = req.user;
    const {idProducto} = req.body
    const cart = await cartService.deleteProductCart(user.id, idProducto);
    success(res, cart)
  } catch (error) {
    next(error)

  }
};

export const removeProduct = async (req, res, next) => {
  try {
    const user = req.user;
    const { idProducto } = req.body
    const cart = await cartService.removeProduct(user.id, idProducto);
    success(res, cart)
  } catch (error) {
    next(error)

  }
};

export const payCart = async (req, res, next) => {
  try {
    const user = req.user;
    const cart = await cartService.payCart(user.id);
    success(res, cart)
  } catch (error) {
    next(error)

  }
};


export const clearCart = async (req, res, next) => {
  try {
    const user = req.user;
    const cart = await cartService.clearCart(user.id);
    success(res, cart)
  } catch (error) {
    next(error)

  }
};

export const paymentIntents = async (req, res, next) => {
  try {
    const { amount, currency = "usd", userId } = req.body;
    const clientSecret = await cartService.paymentIntents(amount, currency, userId);
    res.json({clientSecret})
  } catch (error) {
    next(error)
  }
};

