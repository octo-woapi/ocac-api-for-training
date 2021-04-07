const productsFromFile = require("../datas/products-from-file");
const { productRepository } = require("../repositories/product-repository");

exports.listProducts = (filter) => {
  return productRepository.getProducts(filter);
};
