const Boom = require('@hapi/boom');
const findProductByIdBusiness = require('../../business/find-product-by-id')

exports.findProductByIdRoute = {
  method: "GET",
  path: "/produits/{id}",
  handler: (request, h) => {
    const foundProduct = findProductByIdBusiness.findProductById(request.params.id)
    if(foundProduct === null) {
      throw Boom.notFound("Le produit n'existe pas.")
    }
    const formattedResponse = formatProduct(foundProduct)
    return h.response(formattedResponse);
  }
};

function formatProduct(product) {
  return {
    id: product.id,
    type: product.type,
    titre: product.titre,
    description_courte: product.description_courte,
    description: product.description
  }
}