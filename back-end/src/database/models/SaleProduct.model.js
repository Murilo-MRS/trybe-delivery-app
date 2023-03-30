/* eslint-disable max-lines-per-function */
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
      foreignKey: 'saleId',
      otherKey: 'productId',
    });
    Product.belongsToMany(Sale, {
      as: 'sales',
      through: SalesProducts,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
  };

  return SalesProducts;
};

module.exports = SalesProductsSchema;
