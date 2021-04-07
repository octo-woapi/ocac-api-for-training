// routing
const mainRoutes = require("./controllers/root/root");
const { listProductsRoute } = require("./controllers/products/product-list");
const { findProductRoute } = require("./controllers/products/product-find");
const { createProductRoute } = require("./controllers/products/product-create");

exports.allRoutes = [
  mainRoutes.rootRoute,
  listProductsRoute,
  findProductRoute,
  createProductRoute,
];
