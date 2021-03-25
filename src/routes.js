// routing
const mainRoutes = require("./controllers/root/root");
const listProductsRoutes = require("./controllers/products/list-products");
const findProductRoutes = require("./controllers/products/find-product");
const createProductRoutes = require("./controllers/products/create-product");
const updateProductTypeRoutes = require("./controllers/products/update-product-type");

exports.allRoutes = [
  mainRoutes.rootRoute,
  listProductsRoutes.listProductsRoute,
  findProductRoutes.findProductRoute,
  createProductRoutes.createProductRoute,
  updateProductTypeRoutes.updateProductTypeRoute
];
