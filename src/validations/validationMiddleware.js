import { validationResult } from "express-validator"

const validationMiddleware = (req,res,next) => {
    const error = validationResult(req)
    if (!error.isEmpty()){
      return res.status(400).json({
      mensage: "Error",
      code: 400,
      data: error.array(),
    });
    }
    next()
}

export default validationMiddleware