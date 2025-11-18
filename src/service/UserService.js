import Usuario from "../model/userModel.js";
import bcrypt from "bcrypt";
import { generarAccessToken, generarRefreshToken } from "../utils/jwt.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/errors.js";

export class userService {

async register(body) {
    const { email, password, role, name, lastName, birthdate } = body;
    const existUser = await Usuario.findOne({ email });

    if (existUser) {
      throw new ApiError("El usuario ya existe", 409);
    }

    const passHashed = await bcrypt.hash(password, 10);

    return await Usuario.create({
      email,
      password: passHashed,
      role,
      name,
      lastName,
      birthdate: new Date(birthdate)
    });
  }


  async login(email, password) {
    const user = await Usuario.findOne({ email });
    if (!user) {
      throw new ApiError("invalid Email or Password", 401);
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new ApiError("invalid Email or Password", 401);
    }

    const accesstoken = generarAccessToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    const refreshtoken = generarRefreshToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });
    return { accesstoken, refreshtoken };
  }

  async renovarAccessToken(refreshtoken) {
    const payload = jwt.verify(refreshtoken, process.env.JWT_REFRESH);
    const user = await Usuario.findById(payload.id);
    if (!user) {
      throw new ApiError("no se encontro el usuario", 404);
    }
    const accesstoken = generarAccessToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });
    return accesstoken
  }
}
