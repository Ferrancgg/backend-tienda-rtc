const isAuth = require("../../middlewares/auth");
const authorize = require("../../middlewares/authorize");
const upload = require("../../middlewares/file");
const {
  userRegister,
  login,
  getAllUsers,
} = require("../controllers/usersController");

const userRouter = require("express").Router();


userRouter.post("/register",upload.single("avatar") ,userRegister);

// el login lo haremos con correo electronico y
//  password aunque tambien podriamos hacer que el
//  usuario tubiera un username.tendriamos que
// modificar el Schema y comprobar que los email
// no se repiten para no duplicar

userRouter.post("/login", login);

// solo podran consultar los
// usuarios registrados el perfil de propietario

// MEJORO LA DESCRIPCION DE LA RUTA PAR QUE NO SEA CONFUSA Y LO HAGO CON REGIRSTERED-USERS

userRouter.get("/registered-users", isAuth, authorize(["owner"]), getAllUsers);

module.exports = userRouter;
