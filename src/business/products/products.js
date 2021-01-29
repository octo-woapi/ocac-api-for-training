const productsFromFile = require("../../datas/products-from-file");

exports.listProducts = () => {
  return productsFromFile.products;
};
