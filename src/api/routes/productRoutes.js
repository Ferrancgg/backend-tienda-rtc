const isAuth = require("../../middlewares/auth");
const authorize = require("../../middlewares/authorize");
const upload = require("../../middlewares/file");
const {
  getAllProducts,
  createProduct,
  getProductById,
  deleteProduct,
  putProduct,
} = require("../controllers/productController");

const productRouter = require("express").Router();
///se tendran en cuenta la proteccion de las rutas, ///
//clientes y dueño//

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);

//solo dueño role:owner//

productRouter.post(
  "/",
  isAuth,
  authorize(["owner"]),
  upload.single("image"),
  createProduct
);
productRouter.delete("/:id", isAuth, authorize(["owner"]), deleteProduct);
productRouter.put("/:id", isAuth, authorize(["owner"]),upload.single("image"), putProduct);

module.exports = productRouter;
