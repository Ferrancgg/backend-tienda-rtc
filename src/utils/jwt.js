

const jwt = require("jsonwebtoken");

// Generar un token JWT
const generateSign = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET no está definido en las variables de entorno.");
  }
// modifico el tiempo de expiracion del token para que dure una hora
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Verificar un token JWT
const verifyJwt = (token) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET no está definido en las variables de entorno.");
  }

  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateSign, verifyJwt };


// cambio la ubicacion de la 
// carpeta y modifico los archivos
//  donde se requieren las funciones exportadas