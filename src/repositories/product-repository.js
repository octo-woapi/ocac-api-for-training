const { ProductModel } = require('../datas/models/products');

const create = async (product) => {
    await ProductModel.create(product);
};

const findAll = async (providedType) => {
    if (!providedType) {
        return ProductModel.findAll();
    }
    return ProductModel.findAll({
        where: {
            type: providedType
        }
    });
};

const findOne = async (productId) => {
    return await ProductModel.findOne({ where: { id: productId } });
};

const updateType = async (productId, newType) => {
    return ProductModel.update({ type: newType }, { where: { id: productId } })
}

const remove = async (productId) => {
    await ProductModel.destroy({
        where: {
            id: productId,
        },
    });
}

const removeAll = async (productId) => {
    await ProductModel.destroy({
        where: {},
        truncate: true
    });
}

exports.productRepository = { create, findAll, findOne, remove, removeAll, updateType };
