import { userService } from "../service/UserService.js";

const us = new userService();

export const registerController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = await us.register(email, password);
    res.status(201).json({
      mensage: "Success",
      code: 201,
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      mensage: "Error",
      code: 500,
      data: error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { accesstoken, refreshtoken } = await us.login(email, password);
    res.set({
      Authorization: `Bearer ${accesstoken}`,
      "x-refresh-token": refreshtoken,
    });
    res.status(200).json({
      mensage: "success",
      code: 200,
      data: { accesstoken, refreshtoken },
    });
  } catch (error) {
    res.status(500).json({
      mensage: "Error",
      code: 500,
      data: error,
    });
  }
};

export const renovarTokenController = async (req, res) => {
  try {
    const refreshtoken = req.headers["x-refresh-token"];
    const { accesstoken } = await us.renovarAccessToken(refreshtoken);
    res.set({
      "Authorization": `Bearer ${accesstoken}`,
      "x-refresh-token": refreshtoken,
    });
    res.status(200).json({
      mensage: "success",
      code: 200,
      data: { accesstoken, refreshtoken },
    });
  } catch (error) {
    res.status(500).json({
      mensage: "Error",
      code: 500,
      data: error,
    });
  }
};
