// routing
const mainRoutes = require("./controllers/root/root");
const listProductsRoutes = require("./controllers/products/list-products");
const findProductRoutes = require("./controllers/products/find-product");

exports.allRoutes = [
  mainRoutes.rootRoute,
  listProductsRoutes.listProductsRoute,
  findProductRoutes.findProductRoute,
];
