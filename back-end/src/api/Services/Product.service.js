const { Product } = require('../../database/models');
const errorGenerator = require('../Utils/errorGenerator');

const getAll = async () => {
  const products = await Product.findAll();
  return products;
};

const getById = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) {
    errorGenerator(404, 'Not found');
  }

  return product;
};

module.exports = {
  getAll,
  getById,
};
