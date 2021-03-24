const Boom = require("@hapi/boom");
const Joi = require("joi");

const productsBusiness = require("../../business/products/products");

exports.createProductRoute = {
    method: "POST",
    path: "/produits",
    options: {
        validate: {
            payload: Joi.object({
                type: Joi.string()
                    .valid('service', 'soin')
                    .example("service | soin")
                    .description("Indiquez un type")
                    .required(),
                code_interne: Joi.string()
                    .example("un code interne")
                    .description("Indiquez un code interne")
                    .required(),
                titre: Joi.string()
                    .example("un titre")
                    .description("Indiquez un titre")
                    .required(),
                description_courte: Joi.string()
                    .example("une description courte")
                    .description("Indiquez une description courte")
                    .required(),
                description: Joi.string()
                    .example("une description longue")
                    .description("Indiquez une description longue")
                    .required()
            })
        }
    },
    handler: async (request, h) => {
        const createdProduct = await productsBusiness.createProduct(request.payload)
        return h.response({ productId: createdProduct.id }).created(`/produits/${createdProduct.id}`);
    },
};
