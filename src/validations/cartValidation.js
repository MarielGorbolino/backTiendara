import { body } from "express-validator";
import mongoose from "mongoose";

export const postCart = [
  body("status")
    .optional()
    .isIn(["Pendiente", "Pagado"])
    .withMessage("status debe ser 'Pendiente' o 'Pagado'"),

  // body("detalle")
  //   .isArray({ min: 1 })
  //   .withMessage("detalle debe ser un array con al menos un item"),

  body("detalle.product")
    .notEmpty()
    .withMessage("product es obligatorio")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("product debe ser un ObjectId válido"),

  body("detalle.quantity")
    .isNumeric()
    .withMessage("quantity debe ser numérico")
    .custom((value) => value > 0)
    .withMessage("quantity debe ser mayor a 0")
];
