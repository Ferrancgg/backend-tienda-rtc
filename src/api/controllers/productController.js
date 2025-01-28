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
    return res.status(201).json({ success: true, data: newProduct });
  } catch (err) {
    next(err);
  }
};
const putProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldProduct = Product.findById(id);
    const newProduct = new Product(req.body);
    if (req.file) {
      newProduct.image = req.file.path;
      if (oldProduct.image) {
        deleteFile(oldProduct.image);
      }
    }

    newProduct._id = id;
    const newProductDB = await Product.findByIdAndUpdate(id, newProduct, {
      new: true,
    });
    return res.status(200).json({ success: true, data: newProduct });
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    return res.status(200).json({ success: true, data: product });
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
