import { body } from "express-validator";

export const category = [
  body("name")
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage(
      "error en el nombre: debe ser texto y tener entre 2 y 100 caracteres"
    ),

  body("description")
    .isString()
    .isLength({ min: 5, max: 500 })
    .withMessage(
      "error en la descripción: debe ser texto y tener máximo 300 caracteres"
    ),

  body("image")
    .isString()
    .matches(
      /^(?:data:image\/(?:png|jpg|jpeg|webp);base64,)?[A-Za-z0-9+/]+={0,2}$/
    )
    .withMessage(
      "error en la imagen: debe ser una cadena Base64 válida (con o sin prefijo data:image/...)"
    ),

  body("status")
    .optional()
    .isBoolean()
    .withMessage("error en el status: debe ser booleano (true o false)"),
];

export const patchCategory = [
  body("name")
    .optional()
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage(
      "error en el nombre: debe ser texto y tener entre 2 y 100 caracteres"
    ),

  body("description")
    .optional()
    .isString()
    .isLength({ min: 5, max: 500 })
    .withMessage(
      "error en la descripción: debe ser texto y tener máximo 300 caracteres"
    ),

  body("image")
    .optional()
    .isString()
    .matches(
      /^(?:data:image\/(?:png|jpg|jpeg|webp);base64,)?[A-Za-z0-9+/]+={0,2}$/
    )
    .withMessage(
      "error en la imagen: debe ser una cadena Base64 válida (con o sin prefijo data:image/...)"
    ),

  body("status")
    .optional()
    .isBoolean()
    .withMessage("error en el status: debe ser booleano (true o false)"),
];
