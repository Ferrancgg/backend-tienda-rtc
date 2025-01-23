const { generateSign } = require("../../config/jwt");
const createError = require("../../utils/createError");
const Users = require("../models/users");
const bcrypt = require("bcrypt");

const userRegister = async (req, res, next) => {
  try {
    ///comprovacion de que hay datos suficientes///

    //si todo esta bien creamos usario nuevo//

    const newUser = new Users(req.body);

    //comprobar que los datos no se estan repetidos//
    const userDuplicate = await Users.findOne({ email: req.body.email });
    if (userDuplicate) {
      return next(createError("el email esta duplicado", 400));
    }

    if (userDuplicate) {
      return res.status;
    }

    const userBD = await newUser.save();
    return res.status(200).json({ success: true, data: newUser });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) {
      return next(createError("no hay usuario registrado ", 400));
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateSign(user._id);
      return res.status(200).json({ user, token });
    } else {
      return next(createError("el password no coincide", 400));
    }
  } catch (error) {
    return next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await Users.find();
    return res.status(200).json({ success: true, data: allUsers });
  } catch (error) {
    next(error);
  }
};
module.exports = { userRegister, login, getAllUsers };

// const userLogin
