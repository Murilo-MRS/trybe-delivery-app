const saleService = require('../Services/Sale.service');

const getAll = async (_req, res) => {
    const sales = await saleService.getAll();
    return res.status(200).json(sales);
};

const createSale = async (req, res) => {
  const { body } = req;
  const id = await saleService.create(body);
  return res.status(201).json({ id });
};

module.exports = {
  getAll,
  createSale,
};
