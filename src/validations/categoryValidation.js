import { body } from "express-validator";

export const postCategory = [
  body("name")
    .isString()
    .isLength({ min: 2, max: 100 })
    .withMessage(
      "error en el nombre: debe ser texto y tener entre 2 y 100 caracteres"
    ),

  body("description")
    .isString()
    .isLength({ max: 300 })
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
