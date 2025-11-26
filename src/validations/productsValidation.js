import { body } from "express-validator";

export const producto = [
  body("title")
    .isString()
    .isLength({ min: 2, max: 200 })
    .withMessage(
      "error en el titulo: no cumple con que sea una cadena y su longitud tiene que ser entre 2 y 200"
    ),

  body("price")
    .isNumeric()
    .withMessage("error en el precio: debe ser numérico"),

  body("description")
    .isString()
    .isLength({ min: 5, max: 500 })
    .withMessage(
      "error en la descripción: debe ser texto y tener entre 5 y 500 caracteres"
    ),

  body("images")
    .isArray({ min: 1 })
    .withMessage("Debe enviar al menos una imagen"),

  body("stock").isNumeric().withMessage("error en el stock: debe ser numérico"),

  body("category").notEmpty().withMessage("category requerida"),
];

export const defaultValidation = [];

export const patchProducto = [
  body("title")
    .optional()
    .isString()
    .isLength({ min: 2, max: 200 })
    .withMessage(
      "error en el titulo: no cumple con que sea una cadena y su longitud tiene que ser entre 2 y 200"
    ),

  body("price")
    .optional()
    .isNumeric()
    .withMessage("error en el precio: debe ser numérico"),

  body("description")
    .optional()
    .isString()
    .isLength({ min: 5, max: 500 })
    .withMessage(
      "error en la descripción: debe ser texto y tener entre 5 y 500 caracteres"
    ),

  body("images")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Debe enviar al menos una imagen"),

  body("stock")
    .optional()
    .isNumeric()
    .withMessage("error en el stock: debe ser numérico"),

  body("category").optional().notEmpty().withMessage("category requerida"),
];
