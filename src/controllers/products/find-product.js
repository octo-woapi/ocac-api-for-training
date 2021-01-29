const Boom = require("@hapi/boom");
const Joi = require("joi");

const productsBusiness = require("../../business/products/products");

exports.findProductRoute = {
  method: "GET",
  path: "/produits/{id}",
  options: {
    validate: {
      params: Joi.object({
        id: Joi.string()
          .guid({ version: ["uuidv4"] })
          .example("5d52f17f-b331-4971-ac27-5a8419687074")
          .description("Some product ID")
          .required(),
      }),
    },
  },
  handler: (request, h) => {
    const product = productsBusiness.findProduct(request.params.id);
    if (product === null) {
      throw Boom.notFound("Le produit n'existe pas");
    }
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
