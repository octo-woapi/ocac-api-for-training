const { ProductModel } = require("../datas/models/products");

const create = async (product) => {
  return await ProductModel.create(product);
};

const getProduct = async (id) => {
  return await ProductModel.findOne({ where: { id: id } });
};

const getProducts = async (filter) => {
  let whereClause;
  if (filter !== undefined) {
    whereClause = { where: { type: filter } };
  }
  return await ProductModel.findAll(whereClause);
};

exports.productRepository = { create, getProduct, getProducts };
