const createError = require("../../utils/createError");
const Order = require("../models/order");
const { findOne } = require("../models/product");
const { countDocuments } = require("../models/users");

// aqui creamos  una nueva orden//

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
        { path: "orderItems.product", select: "name price" }
        // estamos populando los datos que vienen de
        // la referencia del producto. Para no tener un exceso de infomacion
        //he dedicido indicar solo nombre y precio
      )
      .populate(
        { path: "user", select: "name email" }
        // Rellenar la referencia del usuario
        // y solo monstrare nombre y email.
        //importante la collecion estar dentro de campo path
      );
    return res.status(200).json({ success: true, data: newOrder });
  } catch (err) {
    next(err);
  }
};

//para modificar una orden el caso mas complejo
//recumeramos la id de params para localizar la orden a modificar
//la nueva orden la consturimos desde la informacion
//que nos llega en el body de la request
// y lo que hacemos es que la nueva orden tenga el id de la que
// modificamos

const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldOrder = await Order.findById(id);

    //coloco un paso en el codigo para gestionar
    // si no hemos encontrado la roden ,
    // aqui me mostrara el error y saldra de
    // la funcion si la orden existe sigue con el proceso.
    if (!oldOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    const newOrder = new Order(req.body);
    newOrder._id = id;
    const newOrderDB = await Order.findByIdAndUpdate(id, newOrder, {
      new: true,
    })
      .populate({ path: "orderItems.product", select: "name price" })
      .populate({ path: "user", select: "name email" });
    return res.status(200).json({ success: true, data: newOrderDB });
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
        { path: "orderItems.product", select: "name price" } // Rellenar la referencia del producto
      )
      .populate(
        { path: "user", select: "name email" }
        // Rellenar la referencia del usuario
      );

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    return res.status(200).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createOrder,
  getAllOrder,
  getOrderById,
  deleteOrder,
  updateOrder,
};
