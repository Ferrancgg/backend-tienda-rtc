const { generateSign } = require("../../config/jwt");
const createError = require("../../utils/createError");
const Users = require("../models/users");
const bcrypt = require("bcrypt");

const userRegister = async (req, res, next) => {
  try {console.log(req.body)
    ///comprovacion de que hay datos suficientes///
    // if (!req.body.name || !req.body.email || !req.body.password) {
    //   return next(createError(400, "Todos los campos son obligatorios"));
    // }

    //comprobar que los datos no se estan repetidos//
    const userDuplicate = await Users.findOne({ email: req.body.email });
    if (userDuplicate) {
      return next(createError(400, "el email esta duplicado"));
    }

    const newUser = new Users(req.body);

    const userBD = await newUser.save();
    return res.status(201).json({ success: true, data: userBD });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return next(createError(400, "Email y password son obligatorios"));
    }

    const user = await Users.findOne({ email: req.body.email });
    if (!user) {
      return next(createError(400, "no hay usuario registrado "));
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateSign(user._id);
      return res.status(200).json({ user, token });
    } else {
      return next(createError(400, "el password no coincide"));
    }
  } catch (error) {
    return next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await Users.find().select("-password");
    return res.status(200).json({ success: true, data: allUsers });
  } catch (error) {
    next(error);
  }
};
module.exports = { userRegister, login, getAllUsers };


