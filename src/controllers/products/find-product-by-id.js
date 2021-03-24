const Boom = require('@hapi/boom');
const Joi = require('joi');
const findProductByIdBusiness = require('../../business/find-product-by-id')

exports.findProductByIdRoute = {
  method: "GET",
  path: "/produits/{id}",
  options: {
    validate: {
      params: Joi.object({
        id: Joi.string()
          .guid({ version: ["uuidv4"] })
          .example("16146a21-c799-4d01-a7be-8965682d2549")
          .description("Some product ID")
          .required()
      })
    }
  },
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