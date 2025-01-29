const createError = require("../utils/createError");
const Users = require("../api/models/users");
const { verifyJwt } = require("../config/jwt");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      console.log("soy primer error token");
      return next(createError("no hay token", 400));
    }
    const parsedToken = token.replace("Bearer ", "");
    const validToken = verifyJwt(parsedToken);
    const userLoged = await Users.findById(validToken.id);
    userLoged.password = null;
    req.user = userLoged;
    next();
  } catch (error) {
    console.log("soy isAuth");
    return next(error);
  }
};

module.exports = isAuth;
