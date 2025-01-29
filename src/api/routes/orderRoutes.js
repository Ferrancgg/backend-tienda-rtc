const isAuth = require("../../middlewares/auth");
const authorize = require("../../middlewares/authorize");
const {
  getAllOrder,
  createOrder,
  deleteOrder,
  updateOrder,
} = require("../controllers/orderController");
const orderRouter = require("express").Router();

orderRouter.get("/", isAuth, authorize(["owner"]), getAllOrder);
orderRouter.post("/", createOrder);
orderRouter.delete("/:id", isAuth, authorize(["owner"]), deleteOrder);
orderRouter.put("/:id", isAuth, authorize(["owner"]), updateOrder);

module.exports = orderRouter;
