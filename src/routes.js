// routing
const mainRoutes = require("./controllers/root/root");
const {
  productListRoute,
  productFindRoute,
} = require("./controllers/products/products");

exports.allRoutes = [mainRoutes.rootRoute, productListRoute, productFindRoute];
