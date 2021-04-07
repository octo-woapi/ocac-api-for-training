const { findProduct } = require("../../business/product-find");
const Boom = require("@hapi/boom");
const Joi = require("joi");
const { createProduct } = require("../../business/product-create");

exports.createProductRoute = {
  method: "POST",
  path: "/produits",
  options: {
    validate: {
      payload: Joi.object({
        type: Joi.string()
          .valid("service", "soin")
          .example("service | soin")
          .description("Indiquez un type")
          .required(),
        code_interne: Joi.string().required(),
        titre: Joi.string().required(),
        description_courte: Joi.string().required(),
        description: Joi.string().required(),
      }),
    },
  },
  handler: async (request, h) => {
    const payload = request.payload;

    const productId = await createProduct(payload);

    return h.response({ id: productId }).created();
  },
};
