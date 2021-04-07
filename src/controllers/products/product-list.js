const { listProducts } = require("../../business/products-list");
const Joi = require("joi");

exports.listProductsRoute = {
  method: "GET",
  path: "/produits",
  options: {
    validate: {
      query: Joi.object({
        type: Joi.string().valid("service", "soin"),
      }),
    },
  },
  handler: async (request, h) => {
    const filter = request.query.type;

    const products = await listProducts(filter);
    const filteredProduct = filterProducts(products);

    return h.response(filteredProduct);
  },
};

const filterProducts = (products) => {
  const filteredProducts = [];
  products.forEach((product) => {
    const filteredProduct = {
      id: product.id,
      type: product.type,
      titre: product.titre,
      description_courte: product.description_courte,
    };
    filteredProducts.push(filteredProduct);
  });

  return filteredProducts;
};
