const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre del producto es obligatorio"],
      trim: true,
      minlength: [3, "El nombre debe tener al menos 3 caracteres"],
    },
    description: {
      type: String,
      trim: true,
      default: "Este producto no tiene descripción aún.",
    },
    price: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: [0, "El precio no puede ser negativo"],
    },
    stock: {
      type: Number,
      required: [true, "El stock es obligatorio"],
      min: [0, "El stock no puede ser negativo"],
      default: 0,
    },
    image: {
      type: String,
      default: "https://example.com/default-product-image.png", //
    },
    category: {
      type: String,
      trim: true,
      default: "General",
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: [true, "El producto debe estar asociado a un usuario"],
    },
  },
  {
    timestamps: true,
    collection: "products",
  }
);

const Product = model("product", productSchema);

module.exports = Product;
