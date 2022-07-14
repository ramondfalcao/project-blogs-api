const createCategory = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category: DataTypes.STRING,
    name: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  return Category;
};

module.exports = createCategory;
