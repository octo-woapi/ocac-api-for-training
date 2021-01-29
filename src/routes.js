// routing
const mainRoutes = require("./controllers/root/root");
const listProductsRoutes = require('./controllers/products/list-products')

exports.allRoutes = [
  mainRoutes.rootRoute,
  listProductsRoutes.listProductsRoute
];
