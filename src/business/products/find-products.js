const { products } = require("../../datas/products/products");

exports.findProducts = () => {
  return products;
};

exports.findById = (id) => {
  return (findProducts = products.find((product) => {
    return id == product.id;
  }));
};
