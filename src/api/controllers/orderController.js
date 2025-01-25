const createError = require("../../utils/createError");
const Order = require("../models/order");
const { findOne } = require("../models/product");
const { countDocuments } = require("../models/users");

const createOrder = async (req, res, next) => {
  try {
    const order = req.body;
    const newOrder = new Order(order);
    const newOrderBD = await newOrder.save();
    res.status(201).json({ success: true, data: newOrder });
  } catch (err) {
    next(err);
  }
};

const getAllOrder = async (req, res, next) => {
  try {
    const newOrder = await Order.find()
      .populate(
        "orderItems.product" // Rellenar la referencia del producto
      )
      .populate(
        "user" // Rellenar la referencia del usuario
      );
    return res.status(201).json({ success: true, data: newOrder });
  } catch (err) {
    next(err);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const {id}=req.params
    const oldOrder=Order.findById(id)
    const newOrder=new Order(req.body)
    newOrder._id=id
    const newOrderDB=await Order.findByIdAndUpdate(id,newOrder,{new:true})
    return res.status(200).json({success:true,data:newProduct})

  } catch (err) {
    next(err);
  }
};
const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const orderDelete = await Order.findByIdAndDelete(id);

    //¿que pasa si no encuntra la orden ?
    //  , necesitamos gestionarlo//
    if (!orderDelete) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // en el caso de que la orden existe
    // devolvemos un json con los datos informando
    // y el status
    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
      data: orderDelete,
    });
  } catch (err) {
    next(err); // Pasar el error al middleware de manejo de errores
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id)
      .populate(
        "orderItems.product" // Rellenar la referencia del producto
      )
      .populate(
        "user" // Rellenar la referencia del usuario
      );
    return res.status(201).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

module.exports = { createOrder, getAllOrder, getOrderById,deleteOrder,updateOrder };
