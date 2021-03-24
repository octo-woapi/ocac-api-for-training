// routing
const mainRoutes = require("./controllers/root/root");
const listProductsRoute = require("./controllers/products/list-products");
const findProductByIdRoute = require("./controllers/products/find-product-by-id");

exports.allRoutes = [
  mainRoutes.rootRoute,
  listProductsRoute.listProductsRoute,
  findProductByIdRoute.findProductByIdRoute
];
