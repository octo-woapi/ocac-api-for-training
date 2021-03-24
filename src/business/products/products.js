const { v4: uuidv4 } = require('uuid')
const { ProductModel } = require("../../datas/models/products")

exports.listProducts = async () => {
  const foundProducts = await ProductModel.findAll()
  return foundProducts;
};

exports.findProduct = async (productId) => {
  const foundProduct = await ProductModel.findByPk(productId)
  return foundProduct;
};

exports.createProduct = async (productToCreate) => {
  const productId = uuidv4()
  const productWithId = { id: productId, ...productToCreate }
  await ProductModel.create(productWithId)
  return productWithId
}

exports.removeAll = async () => {
  await ProductModel.destroy({
    where: {}, 
    truncate: true
  })
}