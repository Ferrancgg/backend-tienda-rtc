

const jwt = require("jsonwebtoken");

// Generar un token JWT
const generateSign = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET no está definido en las variables de entorno.");
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Verificar un token JWT
const verifyJwt = (token) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET no está definido en las variables de entorno.");
  }

  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateSign, verifyJwt };
