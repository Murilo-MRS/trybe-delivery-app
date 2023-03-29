const ProductSchema = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING(100),
    price: DataTypes.DECIMAL(4, 2),
    urlImage: DataTypes.STRING(200),
  }, {
    tableName: 'products',
    underscored: true,
    timestamps: false,
  });

  return Product;
};

module.exports = ProductSchema;
