const sequelize = require("sequelize");

const createUser = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: DataTypes.INTEGER,
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    tableName: 'Users',
    underscored: true,
  });

  User.associate = (db) => {
    User.hasMany(db.BlogPosts, { as: 'Users', foreignKey: 'userId' });
  }

  return User;
};

module.exports = createUser;

