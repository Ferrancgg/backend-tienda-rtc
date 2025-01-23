const isAuth = require("../../middlewares/auth")
const authorize = require("../../middlewares/authorize")
const { getAllProducts, createProduct, getProductById, deleteProduct, putProduct } = require("../controllers/productController")

const productRouter=require("express").Router()
//role:customer//
productRouter.get("/",getAllProducts)

//role:owner//

productRouter.get("/",getAllProducts)
productRouter.post("/",isAuth,authorize(["owner"]),createProduct)
productRouter.get("/:id",getProductById)
productRouter.delete("/:id",[isAuth],deleteProduct)
productRouter.put("/:id",[isAuth],putProduct)


module.exports=productRouter