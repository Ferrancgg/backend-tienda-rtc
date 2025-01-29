const deleteFile = require("../../middlewares/deleteFile");
const createError = require("../../utils/createError");
const Product = require("../models/product");
const Users = require("../models/users");

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate({
      path: "owner",
      select: "name email",
    });
    return res.status(200).json({ data: products });
  } catch (err) {
    next(err);
  }
};
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate({
      path: "owner",
      select: "name email",
    });
    if (!product) {
      return next(createError(404, "Product not found"));
    }
    
    return res.status(200).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

const createProduct = async (req, res, next) => {
  try {
    // if(!req.params){return createError("no se han introducido productos validos ",400)}

    const newProduct = new Product(req.body);
    if (req.file) {
      newProduct.image = req.file.path;
    }
    const productBD = await newProduct.save();
    return res.status(201).json({ success: true, data: productBD });
  } catch (err) {
    next(err);
  }
};


const putProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldProduct = await Product.findById(id);
    if (!oldProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    const newProduct = new Product(req.body);
    // vamos a verificar si existe una imagen en req.file, y la sustituimos por la nueva.
    if (req.file) {
      newProduct.image=req.file.path;
      if (oldProduct.image) {
       deleteFile(oldProduct.image);
      }
      req.body.image = req.file.path;
      
    }

    newProduct._id = id;
    const newProductDB = await Product.findByIdAndUpdate(id, newProduct, {
      new: true,
    });
    return res.status(200).json({ success: true, data: newProductDB });
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Eliminar la imagen del servidor si existe
    if (product.image) {
      await deleteFile(product.image);
    }

    await product.deleteOne();

    return res.status(200).json({ success: true, message: "Product deleted successfully", data: product });
  } catch (err) {
    next(err);
  }
};



module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  putProduct,
  deleteProduct,
};
