const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("conectado a la BBDD");
  } catch (error) {
    return console.log(error);
  }
};
module.exports = connectDB;
