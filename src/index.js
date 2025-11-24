import express from "express";
import productsRouter from "./router/productsRouter.js";
import categoryRouter from "./router/categoryRouter.js";
import userRouter from "./router/userRouter.js";
import cartRouter from "./router/cartRouter.js";
import env from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import Stripe from "stripe";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json" with {type:"json"}
import { logger } from "./config/Winston.js";
import { errorHandler } from "./middleware/errorHandler.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

env.config();

const PORT = process.env.PORT || 3008;

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "https://tiendara.netlify.app"],
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


app.post("/create-payment-intent", async (req, res) => {
  const { amount, currency = "usd", userId } = req.body;
  const intentoPago = await stripe.paymentIntents.create({
    amount,
    currency,
    customer: userId,
    automatic_payment_methods: { enabled: true },
  });
  res.json({clientSecret:intentoPago.client_secret})
});

app.use((req, res) => {
  res.status(404).json({
    mensage: "Route not found",
    code: 404,
    data: {},
  });
});
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
