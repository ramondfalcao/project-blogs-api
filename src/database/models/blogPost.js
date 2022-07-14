const createBlogPost = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.STRING,
    updated:  DataTypes.STRING,
  }, {
    timestamps: false,
  });

  BlogPost.associate = (db) => {
    BlogPost.belongsTo(db.User, { as: 'User', foreignKey: 'id' });
  }
  return BlogPost;
};

module.exports = createBlogPost;

