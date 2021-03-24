const productsBusiness = require('../../business/list-products')

exports.listProductsRoute = {
  method: "GET",
  path: "/produits",
  handler: (request, h) => {
    const foundProducts = productsBusiness.listProducts()
    const formattedResponse = formatProduct(foundProducts)
    return h.response(formattedResponse);
  },
};

function formatProduct(products) {
    return products.map((product) => {
        return {
            id: product.id,
            type: product.type,
            titre: product.titre,
            description_courte: product.description_courte
        }
    })
}