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
      default: "Sin descripción",
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
      default: null, // URL de la imagen en Cloudinary u otro servicio
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "users" // Referencia al modelo User
      // required: [true, "El producto debe estar asociado a un usuario"],
    },
  },
  {
    timestamps: true, // Crea automáticamente campos createdAt y updatedAt
    collection: "products", // Nombre explícito de la colección
  }
);


const Product=model("product", productSchema)

module.exports = Product;
