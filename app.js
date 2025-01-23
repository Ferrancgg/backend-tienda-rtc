const express = require("express");
const connectDB = require("./src/config/db");
const indexRouter = require("./src/api/routes/indexRouter");
const setError = require("./src/middlewares/setError");

require("dotenv").config();
const app = express();
app.use(express.json());
connectDB();
connectDB;
const PORT = 3200;

app.listen(PORT, () => {
  console.log(`conectado a puerto http://localhost:${PORT}`);
});
app.use("/v1/api",indexRouter)
// app.use("/ping", => {
//   return res.status(200).json("pong");
// });
app.use("*", (req, res, next) => {
  return res.status(400).json("ruta no encontrada");
});
app.use(setError)
