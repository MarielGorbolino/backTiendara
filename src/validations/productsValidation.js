import { body } from "express-validator";

export const postProducto = [
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

 body("image")
    .isString()
    // .matches(
    //   /^(?:data:image\/(?:png|jpg|jpeg|webp);base64,)?[A-Za-z0-9+/]+={0,2}$/
    // )
    .withMessage(
      "error en la imagen: debe ser una cadena Base64 válida (con o sin prefijo data:image/...)"
    ),

  body("stock")
    .isNumeric()
    .withMessage("error en el stock: debe ser numérico"),

  body("category")
    .notEmpty()
    .withMessage("category requerida"),

  body("rating.rate")
    .optional()
    .isNumeric()
    .withMessage("rating.rate debe ser numérico"),

  body("rating.count")
    .optional()
    .isNumeric()
    .withMessage("rating.count debe ser numérico"),
];

export const defaultValidation = [];
