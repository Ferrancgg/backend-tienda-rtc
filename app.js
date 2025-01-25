const express = require("express");
const connectDB = require("./src/config/db");
const indexRouter = require("./src/api/routes/indexRouter");
const setError = require("./src/middlewares/setError");
const cloudinary = require("cloudinary").v2;

require("dotenv").config();
const app = express();
app.use(express.json());
connectDB();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = 3200;

app.listen(PORT, () => {
  console.log(`conectado a puerto http://localhost:${PORT}`);
});
app.use("/v1/api", indexRouter);

app.use("*", (req, res, next) => {
  return res.status(400).json("ruta no encontrada");
});
app.use(setError);
