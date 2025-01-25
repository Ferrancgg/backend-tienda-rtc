const isAuth = require("../../middlewares/auth");
const authorize = require("../../middlewares/authorize");
const {
  userRegister,
  login,
  getAllUsers,
} = require("../controllers/usersController");


const userRouter = require("express").Router();

userRouter.post("/register", userRegister);

// el login lo haremos con correo electronico y
//  password aunque tambien podriamos hacer que el
//  usuario tubiera un username.tendriamos que
// modificar el Schema y comprobar que los email
// no se repiten para no duplicar

userRouter.post("/login", login);

// solo podran consultar los
// usuarios registrados el perfil de propietario

userRouter.get("/register", isAuth, authorize(["owner"]), getAllUsers);

module.exports = userRouter;
