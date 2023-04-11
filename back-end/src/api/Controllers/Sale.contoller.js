const saleService = require('../Services/Sale.service');

// const getAll = async (_req, res) => {
//     const sales = await saleService.getAll();
//     return res.status(200).json(sales);
// };

const createSale = async (req, res) => {
  const { body } = req;
  const id = await saleService.create(body);
  return res.status(201).json({ id });
};

const getOrdersByCustomer = async (req, res) => {
  const { id } = req.params;
  const orders = await saleService.getAllByUser(id, 'customer');
  return res.status(200).json(orders);
};

const getOrdersBySeller = async (req, res) => {
  const { id } = req.params;
  const orders = await saleService.getAllByUser(id, 'seller');
  return res.status(200).json(orders);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await saleService.getSaleById(id);
  return res.status(200).json(sale);
};

const changeStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const sale = await saleService.changeStatus(id, status);
  return res.status(201).json(sale);
};

module.exports = {
  // getAll,
  createSale,
  getOrdersByCustomer,
  getOrdersBySeller,
  getSaleById,
  changeStatus,
};
