const productService = require('../Services/Product.service');

const getAll = async (_req, res) => {
    const products = await productService.getAll();
    return res.status(200).json(products);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const product = await productService.getById(+id);
    return res.status(200).json(product);
};

module.exports = {
  getAll,
  getById,
};
