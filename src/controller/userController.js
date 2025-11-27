import { userService } from "../service/UserService.js";
import { success } from "../utils/response.js";

const us = new userService();

export const registerController = async (req, res, next) => {
  try {
    const newUser = await us.register(req.body);
    success(res, newUser, 201)
  } catch (error) {
    next(error)
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { accesstoken, refreshtoken } = await us.login(email, password);
    res.set({
      Authorization: `Bearer ${accesstoken}`,
      "x-refresh-token": refreshtoken,
    });
    success(res, { accesstoken, refreshtoken })
  } catch (error) {
    next(error)
}
};

export const renovarTokenController = async (req, res, next) => {
  try {
    const refreshtoken = req.headers["x-refresh-token"];
    const accesstoken = await us.renovarAccessToken(refreshtoken);
    res.set({
      "Authorization": `Bearer ${accesstoken}`,
      "x-refresh-token": refreshtoken,
    });
    success(res, { accesstoken, refreshtoken })
  } catch (error) {
    next(error)
}};

export const getUser = async (req, res, next) => {
  try {
    const user = req.user;
    const userModel = await us.getUser(user.id);
    success(res, userModel)
  } catch (error) {
    next(error)
}};


export const updateUser = async (req, res, next) => {
  try {
    const user = req.user;
    const userModel = await us.updateUser(user.id, req.body);
    success(res, userModel)
  } catch (error) {
    next(error)
}};

export const deleteUser = async (req, res, next) => {
  try {
    const user = req.user;
    await us.deleteUser(user.id);
    success(res, {}, 204)
  } catch (error) {
    next(error)
}};