const { Sale, SaleProduct } = require('../../database/models');
// const errorGenerator = require('../Utils/errorGenerator');
const { getUser } = require('./User.service');

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
  const { products, email, ...saleData } = infoSale;
  const userId = await getUser({ email });

  const body = {
    ...saleData,
    userId: userId.id,
  };

  const { dataValues: { id } } = await createSale(body);
  await createSaleProduct(id, products);

  return id;
};

module.exports = {
  create,
  createSale,
  createSaleProduct,
};
