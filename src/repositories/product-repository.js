const { ProductModel } = require('../datas/models/products');

const create = async (product) => {
    await ProductModel.create(product);
};

const findAll = async () => {
    const result = await ProductModel.findAll();
    return result;
  };
  
const findOne = async (productId) => {
    return await ProductModel.findOne({ where: { id: productId } });
};

const remove = async (productId) => {
    await ProductModel.destroy({
        where: {
            id: productId,
        },
    });
}

const removeAll = async (productId) => {
    await ProductModel.destroy({
        where: { },
        truncate: true
    });
}

exports.productRepository = { create, findAll, findOne, remove, removeAll };
