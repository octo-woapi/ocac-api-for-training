const productsBusiness = require("../../business/products/products");

exports.listProductsRoute = {
  method: "GET",
  path: "/produits",
  handler: async (request, h) => {
    const productsList = await productsBusiness.listProducts();
    const formattedProducts = productsFormat(productsList);
    return h.response(formattedProducts);
  },
};

function productsFormat(products) {
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
