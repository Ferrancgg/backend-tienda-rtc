const orderRouter = require("./orderRoutes");
const productRouter = require("./productRoutes");
const userRouter = require("./usersRoutes");

const indexRouter = require("express").Router();

indexRouter.use("/products", productRouter);
indexRouter.use("/auth", userRouter);
indexRouter.use("/order", orderRouter);
module.exports = indexRouter;
