const { Sale, SaleProduct } = require('../../database/models');
// const errorGenerator = require('../Utils/errorGenerator');

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

  const { dataValues: { id } } = await createSale(saleData);
  await createSaleProduct(id, products);

  return id;
};

module.exports = {
  create,
  createSale,
  createSaleProduct,
};
