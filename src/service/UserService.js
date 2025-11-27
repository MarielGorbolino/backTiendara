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

  async getUser(id) {
    const user = await Usuario.findById({ _id: id });
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  async updateUser(id, body) {
    const { email, password, role, name, lastName, birthdate } = body;
    const user = await Usuario.findById({ _id: id });
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    user.email = email || user.email;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    user.role = role || user.role;
    user.name = name || user.name;
    user.lastName = lastName || user.lastName;
    user.birthdate = birthdate ? new Date(birthdate) : user.birthdate;

    await user.save();
    return await Usuario.findById(id).select("-password -__v");
  }

  async deleteUser(id) {
    const user = await Usuario.findByIdAndDelete({ _id: id });
    if (!user) {
      throw new ApiError("User not found", 404);
    } 
    return user;
  }

}
