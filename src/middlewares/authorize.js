const createError = require("../utils/createError");

const authorize = (roles) => {
  return (req, res, next) => {
    // Verificar si el usuario autenticado tiene el rol necesario
    if (!roles.includes(req.user.role)) {
      return next(createError("No tienes permisos para acceder a esta ruta", 403));
    }
    next();
  };
};

module.exports = authorize;
