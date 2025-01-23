const { getAllOrder, createOrder } = require("../controllers/orderController");

const orderRouter = require("express").Router();

orderRouter.get("/", getAllOrder);
orderRouter.post("/", createOrder);

module.exports = orderRouter;
