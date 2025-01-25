// const mongoose = require('mongoose');



// const orderSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "users",
//     required: true,
//   },
//   orderItems: [
//     {
//       product: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "product",
//         required: true,
//       },
//       quantity: { type: Number, required: true },
//     },
//   ],
//   shippingAddress: {
//     address: { type: String, required: true },
//     city: { type: String, required: true },
//     postalCode: { type: String, required: true },
//     country: { type: String, required: true },
//   },
//   paymentMethod: { type: String, required: true },
//   paymentResult: {
//     id: { type: String },
//     status: { type: String },
//     update_time: { type: String },
//     email_address: { type: String },
//   },
//   itemsPrice: { type: Number, required: true, default: 0.0 },
//   taxPrice: { type: Number, required: true, default: 0.0 },
//   shippingPrice: { type: Number, required: true, default: 0.0 },
//   totalPrice: { type: Number, required: true, default: 0.0 },
//   isPaid: { type: Boolean, required: true, default: false },
//   paidAt: { type: Date },
//   isDelivered: { type: Boolean, required: true, default: false },
//   deliveredAt: { type: Date },
// }, {
//   timestamps: true,
// });

// const Order=mongoose.model(`order`,orderSchema)

// module.exports = Order


const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Relación con el modelo de usuario
      required: true,
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product", // Relación con el modelo de productos
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // Campos createdAt y updatedAt automáticos
  }
);


const Order = model("order", orderSchema);

module.exports = Order;
