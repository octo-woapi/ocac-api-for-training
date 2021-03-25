const { v4: uuidv4 } = require('uuid');
const productsFromFile = require("../../datas/products-from-file");
const { productRepository } = require("../../repositories/product-repository")

exports.listProducts = (providedType) => {
  return productRepository.findAll(providedType);
};

exports.findProduct = async (productId) => {
  const foundProduct = await productRepository.findOne(productId)
  return foundProduct;
};

exports.createProduct = async (productToCreate) => {
  const productId = uuidv4();
  const productWithId = { ...productToCreate, id: productId }
  await productRepository.create(productWithId)
  return productWithId
}

exports.updateType = async (productId, newType) => {
  return productRepository.updateType(productId, newType)
}