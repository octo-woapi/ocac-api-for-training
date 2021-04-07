const { findProduct } = require("../../business/product-find");
const Boom = require("@hapi/boom");
const Joi = require("joi");

exports.findProductRoute = {
  method: "GET",
  path: "/produits/{id}",
  options: {
    validate: {
      params: Joi.object({
        id: Joi.string()
          .guid({ version: ["uuidv4"] })
          .required(),
      }),
    },
  },

  handler: async (request, h) => {
    const id = request.params.id;
    const product = await findProduct(id);
    if (product === undefined) {
      throw Boom.notFound("Resource not found");
    }

    return h.response(product);
  },
};
