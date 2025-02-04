const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    // esta es la forma de expresar 3 minutos
  windowMs: 3 * 60 * 1000, 
  max: 50,
   // Máximo de 50 peticiones por IP en ese tiempo
  message: "Demasiadas solicitudes desde esta IP, inténtalo de nuevo más tarde.",
  headers: true, 
});

module.exports = limiter;

// LO USAREMOS DE FORMA GLOBAL EN TODAS LAS RUTAS PARA LIMITAR EL USO,
// LO APLICO EN APP JS
//  TAMBIEN PUEDO USARLO COMO MIDDLEWARE EN DETERMINADAS RUTAS PARA LIMITAR
//  SU NUMERO DE PETICIONES
