const productsBusiness = require("../../business/products/products");

exports.listProductsRoute = {
  method: "GET",
  path: "/produits",
  handler: (request, h) => {
    return h.response(productsBusiness.listProducts());
  },
};
