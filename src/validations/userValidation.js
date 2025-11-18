import { body } from "express-validator";

export const postUsuario = [
  body("email")
    .notEmpty().withMessage("email requerido")
    .isEmail().withMessage("error en el email: debe ser un correo válido"),

  body("password")
    .notEmpty().withMessage("la contraseña es requerida")
    .isString().withMessage("la contraseña debe ser un texto")
    .isLength({ min: 6 }).withMessage("la contraseña debe tener al menos 6 caracteres"),

  body("role")
    .isIn(["user", "admin"])
    .withMessage("error en el rol: debe ser 'user' o 'admin'")
    .notEmpty().withMessage("El rol es requerido"),

  body("name")
    .notEmpty().withMessage("el nombre es requerido")
    .isString().withMessage("el nombre debe ser un texto")
    .isLength({ min: 2, max: 100 })
    .withMessage("el nombre debe tener entre 2 y 100 caracteres"),

  body("lastName")
    .notEmpty().withMessage("el apellido es requerido")
    .isString().withMessage("el apellido debe ser un texto")
    .isLength({ min: 2, max: 100 })
    .withMessage("el apellido debe tener entre 2 y 100 caracteres"),

  body("birthdate")
    .notEmpty().withMessage("la fecha de nacimiento es requerida")
    .isISO8601().withMessage("la fecha de nacimiento debe ser válida (formato ISO)")
    .toDate(),
];

export const postUsuarioLogin = [
  body("email")
    .notEmpty().withMessage("email requerido")
    .isEmail().withMessage("error en el email: debe ser un correo válido"),

  body("password")
    .notEmpty().withMessage("la contraseña es requerida")
    .isString().withMessage("la contraseña debe ser un texto")
];
