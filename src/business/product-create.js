const { productRepository } = require("../repositories/product-repository");
const { v4: uuidv4 } = require("uuid");

exports.createProduct = async (payload) => {
  //generation identifiant
  const id = uuidv4();
  const productToCreate = {
    id: id,
    ...payload,
  };

  const creationResult = await productRepository.create(productToCreate);

  return creationResult.dataValues.id;
};
