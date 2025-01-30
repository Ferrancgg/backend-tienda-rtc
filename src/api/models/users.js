// const mongoose = require("mongoose");
// const { Schema, model } = mongoose;
// const bcrypt=require("bcrypt")

// const userSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "El nombre es obligatorio"],
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: [true, "El correo electrónico es obligatorio"],
//       unique: true,
//       lowercase: true,
//       match: [
//         /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
//         "Por favor, ingresa un correo válido",
//       ],
//     },
//     password: {
//       type: String,
//       required: [true, "La contraseña es obligatoria"],
//       minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
//     },
//     avatar: {
//       type: String,
//       default: null, // URL opcional
//     },
//     role: {
//       type: String,
//       enum: ["owner", "customer"],
//       default: "customer", // Rol predeterminado
//     },
//   },
//   { timestamps: true, collection: "users" }
// );

// userSchema.pre("save" ,function(next){
//     this.password=bcrypt.hashSync(this.password,10)

//     return next()

// })

// const Users = model("users", userSchema);

// module.exports = Users;

const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "El correo electrónico es obligatorio"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Por favor, ingresa un correo válido",
      ],
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
    },
    avatar: {
      type: String,
      default: "https://example.com/default-avatar.png", // URL genérica
    },
    role: {
      type: String,
      enum: ["owner", "customer"],
      default: "customer", // Rol predeterminado
    },
    storeName: {
      type: String,
      required: function () {
        return this.role === "owner";
      }, // Campo obligatorio solo para dueños
      trim: true,
    },
  },
  { timestamps: true, collection: "users" }
);

// Middleware para hashear la contraseña antes de guardar
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next(); // Solo hashea si la contraseña fue modificada
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

// Método para verificar contraseñas
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

const Users = model("users", userSchema);

module.exports = Users;
