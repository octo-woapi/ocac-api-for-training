const productsBusiness = require("../../business/products/products");

exports.findProductRoute = {
  method: "GET",
  path: "/produits/{id}",
  handler: (request, h) => {
    const product = productsBusiness.findProduct(request.params.id);
    const formattedProduct = productFormat(product);
    return h.response(formattedProduct);
  },
};

function productFormat(product) {
  return {
    id: product.id,
    type: product.type,
    titre: product.titre,
    description_courte: product.description_courte,
    description: product.description,
  };
}
