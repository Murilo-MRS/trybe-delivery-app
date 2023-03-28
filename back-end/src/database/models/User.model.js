const { Sequelize } = require('sequelize');

const UserSchema = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    tableName: 'users',
    underscored: true,
    timestamps: false,
  });

  User.associate = ({ Sale }) => {
    User.hasMany(Sale, {
      foreignKey: 'id',
      as: 'userSales',
    });
    User.hasMany(Sale, {
      foreignKey: 'id',
      as: 'sellerSales',
    });
  };

  return User;
};

module.exports = UserSchema;
