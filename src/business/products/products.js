const productsFromFile = require("../../datas/products-from-file");

exports.listProducts = () => {
  return productsFromFile.products;
};

exports.findProduct = (productId) => {
  let foundProduct = null;
  productsFromFile.products.forEach((product) => {
    if (product.id === productId) {
      foundProduct = product;
    }
  });
  return foundProduct;
};
