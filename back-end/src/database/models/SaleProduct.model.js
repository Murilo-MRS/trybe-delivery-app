const { Sequelize } = require('sequelize');

const SalesProductsSchema = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('SaleProduct', {
    saleId: { type: DataTypes.INTEGER, foreignKey: true },
    productId: { type: DataTypes.INTEGER, foreignKey: true },
    quantity: DataTypes.INTEGER,
  }, {
    tableName: 'sales_products',
    underscored: true,
    timestamps: false,
  });

  SalesProducts.associate = ({ Product, Sale }) => {
    Sale.belongsToMany(Product, {
      as: 'products',
      through: SalesProducts,
      foreignKey: 'sale_id',
      otherKey: 'product_id',
    });
    Product.belongsToMany(Sale, {
      as: 'sales',
      through: SalesProducts,
      foreignKey: 'product_id',
      otherKey: 'sale_id',
    });
  };

  return SalesProducts;
};

module.exports = SalesProductsSchema;
