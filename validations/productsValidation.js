import { body } from "express-validator";

export const postProducto = [
  body("name")
    .isString()
    .isLength({ min: 2, max: 200 })
    .withMessage(
      "error en el titulo: no cumple con que sea una cadena y su longitud tiene que ser entre 2 y 200"
    ),
  body("price").isNumeric().withMessage("error en el precio: no es numerico"),
  body("stock")
    .optional()
    .isNumeric()
    .withMessage("error en el stock tiene que ser numerico"),
];

export const defaultValidation = []
