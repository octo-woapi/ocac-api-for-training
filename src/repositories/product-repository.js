const { ProductModel } = require('../datas/models/products');

const create = async (product) => {
    await ProductModel.create(product);
};

exports.productRepository = { create };