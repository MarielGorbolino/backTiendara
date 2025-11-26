import express from "express";
import productsRouter from "./router/productsRouter.js";
import categoryRouter from "./router/categoryRouter.js";
import userRouter from "./router/userRouter.js";
import cartRouter from "./router/cartRouter.js";
import env from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json" with {type:"json"}
import { logger } from "./config/Winston.js";
import { errorHandler } from "./middleware/errorHandler.js";

env.config();

const PORT = process.env.PORT || 3008;

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "https://tiendara.netlify.app", "https://front-tiendara.vercel.app"],
  methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "x-refresh-token"],
};

app.use((req,res,next)=>{
  logger.info(`${req.method} - ${req.url} - ${req.originalUrl}`)
  next()
})

app.use(express.json({ limit: "10mb" }));
app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use("/api/user", userRouter);
app.use("/api/products", productsRouter); //ABMC
app.use("/api/category", categoryRouter);
app.use("/api/cart", cartRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))


app.use(errorHandler)

mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("base de datos conectada a " + process.env.MONGOURL);
  })
  .catch((error) => {
    console.log(error);
  });


app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto " + PORT);
});




//MONGOURL=mongodb://localhost:27017/ecommerce
