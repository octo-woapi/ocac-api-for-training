const Boom = require("@hapi/boom");
const Joi = require("joi");
const {
  findProducts,
  findById,
} = require("../../business/products/find-products");

exports.productListRoute = {
  method: "GET",
  path: "/produits",
  handler: (request, h) => {
    const products = findProducts();

    const formattedProducts = formatProducts(products);

    return h.response(formattedProducts);
  },
};

exports.productFindRoute = {
  method: "GET",
  path: "/produits/{id}",
  options: {
    validate: {
      params: Joi.object({
        id: Joi.string()
          .guid({ version: ["uuidv4"] })
          .example("cbde49b0-b7c0-446b-ac41-9e89a8bc1c8e")
          .description("Some product Id")
          .required(),
      }),
    },
  },
  handler: (request, h) => {
    const id = request.params.id;
    const product = findById(id);

    if (product === undefined) {
      throw Boom.notFound("Le produit n'existe pas");
    }

    return h.response(product);
  },
};

function formatProducts(products) {
  const formattedProducts = [];

  products.forEach((product) => {
    formattedProducts.push({
      id: product.id,
      type: product.type,
      titre: product.titre,
      description_courte: product.description_courte,
    });
  });

  return formattedProducts;
}
