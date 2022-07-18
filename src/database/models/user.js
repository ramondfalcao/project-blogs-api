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
    timestamps: false,
  });

  User.associate = (db) => {
    User.hasMany(db.BlogPost, { as: 'BlogPost', foreignKey: 'userId' });
  }

  return User;
};

module.exports = createUser;

