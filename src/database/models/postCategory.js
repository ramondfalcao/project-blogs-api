const createPostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  }, {
    timestamps: false,
  });

  PostCategory.associate = (db) => {
    db.BlogPost.belongsToMany(db.Category, {
      as: 'Category',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    db.Category.belongsToMany(db.BlogPost, {
      as: 'BlogPost',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };
  return PostCategory;
};

module.exports = createPostCategory;

