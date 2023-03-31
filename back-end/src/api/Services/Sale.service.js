const { Sale, SaleProduct, Product, User } = require('../../database/models');
const errorGenerator = require('../Utils/errorGenerator');

const createSaleProduct = async (saleId, products) => {
  const newSaleProduct = products.map(
    async ({ id, quantity }) =>
      SaleProduct.create({
        saleId,
        productId: id,
        quantity,
      }),
  );
  
  const salesProducts = await Promise.all(newSaleProduct);
  return salesProducts;
};

const createSale = async (infoSale) => {
  const newSale = await Sale.create({
    ...infoSale,
    saleDate: new Date(),
    status: 'Pendente',
  });

  return newSale;
};

const create = async (infoSale) => {
  const { products, ...saleData } = infoSale;

  const body = {
    ...saleData,
  };

  const { dataValues: { id } } = await createSale(body);
  await createSaleProduct(id, products);

  return id;
};

const getAllByUser = async (userId) => {
  const orders = await Sale.findAll({ where: { userId } }, { raw: true });
  return orders;
};

const changeStatus = async (id, status) => {
  const listStatus = ['Pendente', 'Preparando', 'Em trânsito', 'Entregue'];
  const sale = await Sale.findByPk(id, { raw: true });
  if (!sale) throw errorGenerator(404, 'Sale not found');
  const newStatus = await Sale
  .update({ status: listStatus[status - 1] }, { where: { id } });
  return newStatus;
};

const getSaleById = async (id) => {
  const sale = await Sale.findOne(
  {
    include: [
      { model: User, as: 'seller', attributes: ['name'] },
      { model: Product, as: 'products' },

  ], 
    where: { id } }, 
    { raw: true },
  );

  return sale;
};

module.exports = {
  create,
  createSale,
  createSaleProduct,
  getAllByUser,
  getSaleById,
  changeStatus,
};
