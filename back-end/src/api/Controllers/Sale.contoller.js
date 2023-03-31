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

const getOrdersByUser = async (req, res) => {
  const { id } = req.params;
  const orders = await saleService.getAllByUser(id);

  return res.status(200).json(orders);
};

module.exports = {
  getAll,
  createSale,
  getOrdersByUser,
};
