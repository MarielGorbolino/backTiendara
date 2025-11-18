import { logger } from "../config/Winston.js"

export const errorHandler = (err, req, res, next) => {
    const status = err.statusCode || 500;
    logger.error(`${req.method} - ${req.url} - ${err.message}`);

    res.status(status).json({
        mensage: err.message || "Internal server error",
        code: status
    });
};
