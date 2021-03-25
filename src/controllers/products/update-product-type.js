const Boom = require("@hapi/boom");
const Joi = require("joi");

const productsBusiness = require("../../business/products/products");

exports.updateProductTypeRoute = {
  method: "PUT",
  path: "/produits/{id}/type",
  options: {
    validate: {
      params: Joi.object({
        id: Joi.string()
          .guid({ version: ["uuidv4"] })
          .example("5d52f17f-b331-4971-ac27-5a8419687074")
          .description("Some product ID")
          .required(),
      }),
      payload: Joi.object({
        type: Joi.string()
          .valid('service', 'soin')
          .example("service | soin")
          .description("Indiquez un type")
          .required()
      }),
    }
  },
  handler: async (request, h) => {
    const productIdToUpdate = request.params.id
    const newProductType = request.payload.type

    const foundProduct = await productsBusiness.findProduct(productIdToUpdate)
    if (foundProduct === null) {
      throw Boom.notFound("Le produit n'existe pas");
    }
    await productsBusiness.updateType(productIdToUpdate, newProductType)
    return h.response().code(204)
  }
};

