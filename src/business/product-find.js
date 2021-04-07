const productsFromFile = require("../datas/products-from-file");
const { productRepository } = require("../repositories/product-repository");

exports.findProduct = (id) => {
  return productRepository.getProduct(id);
};
