const { Sequelize } = require('sequelize');

const SaleSchema = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    sellerId: { type: DataTypes.INTEGER, foreignKey: true },
    totalPrice: DataTypes.DECIMAL(9, 2),
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING(50),
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING(50),
  }, {
    tableName: 'sales',
    underscored: true,
    timestamps: false,
  });

  Sale.associate = ({ User }) => {
    Sale.belongsTo(User, {
      as: 'user',
      foreignKey: 'userId', 
    });
    Sale.belongsTo(User, {
      as: 'seller',
      foreignKey: 'sellerId', 
    });
  };

  return Sale;
};

module.exports = SaleSchema;
