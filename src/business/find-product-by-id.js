const productsFromFile = require("../datas/products-from-file")

exports.findProductById = (productId) => {
    const foundProduct = productsFromFile.products.find((product) => product.id === productId)
    if(foundProduct === undefined) {
        return null
    }
    return foundProduct
}