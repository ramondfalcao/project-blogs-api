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
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      onDelete: 'cascade',
    },
    updated:{
      type: DataTypes.DATE
    },
    published: {
      type: DataTypes.DATE
    }
  }, {
    timestamps: false,
    createdAt: 'published',
    updateAt: 'updated'
  });

  BlogPost.associate = (db) => {
    BlogPost.hasMany(db.PostCategory, { foreignKey: 'postId' });
    BlogPost.belongsTo(db.User, { as: 'User', foreignKey: 'userId' });
  }
  return BlogPost;
};

module.exports = createBlogPost;

