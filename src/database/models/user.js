const createUser = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    tableName: 'Users',
    timestamps: false,
  });

  User.associate = (db) => {
    User.hasMany(db.BlogPost, { as: 'BlogPost', key: 'userId' });
  }

  return User;
};

module.exports = createUser;

