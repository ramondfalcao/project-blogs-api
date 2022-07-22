const Joi = require('joi');
const db = require('../database/models');

const createObject = (listPosts) => {
  const newObject = { id: listPosts.dataValues.id,
    title: listPosts.dataValues.title,
    content: listPosts.dataValues.content,
    userId: listPosts.dataValues.userId,
    published: listPosts.dataValues.published,
    updated: listPosts.dataValues.updated,
    user: listPosts.dataValues.User.dataValues,
    categories: listPosts.dataValues.Category,
  };

  return newObject;
};

const postService = {
  validateBody: (data) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      categoryIds: Joi.array().required(),
    });

    const { error, value } = schema.validate(data);

    if (error) {
    const e = new Error('Some required fields are missing');
    e.name = 'ValidationError';
    throw e;
    } 

    return value;
  },

  validateBodyUpdated: (data) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
    });

    const { error, value } = schema.validate(data);

    if (error) {
    const e = new Error('Some required fields are missing');
    e.name = 'ValidationError';
    throw e;
    } 

    return value;
  },

    categoryValidation: async (categoryIds) => {
    const categories = await db.Category.findAll({ where: { id: categoryIds } });
    if (categoryIds.length !== categories.length) {
      const e = new Error('"categoryIds" not found');
      e.name = 'ValidationError';
      throw e;
    }
  },

  create: async (title, content, userEmail, categoryIds) => {
    try {
      const user = await db.User.findOne({ where: { email: userEmail } });
      const { id } = user.dataValues;

      const postCreated = await db.BlogPost
      .create({ title, content, userId: id, updated: new Date(), published: new Date() });

      const postCategories = categoryIds.map((item) => ({
        postId: postCreated.id,
        categoryId: item,
      }));
      
      await db.PostCategory.bulkCreate(postCategories);
      console.log(postCreated);
      return postCreated;
    } catch (err) {
      const e = new Error('Algo deu errado');
      throw e;
    }
  },

  list: async () => {
    const listPosts = await db.BlogPost.findAll({
      include: [{ model: db.User, as: 'User', attributes: { exclude: 'password' } },
      { model: db.Category, as: 'Category' }],
    });
    const filterPost = listPosts.map(({ dataValues }) => dataValues)
    .map(({ id, title, content, userId, published, updated, User, Category }) => ({
      id,
      title,
      content,
      userId,
      published,
      updated,
      user: User.dataValues,
      categories: Category,
    })); 

    return filterPost;
  },

  findById: async (atualId) => {
    const post = await db.BlogPost.findByPk(atualId, {
      include: [{ model: db.User, as: 'User', attributes: { exclude: 'password' } },
      { model: db.Category, as: 'Category' }],
    });

    if (!post) {
      const e = new Error('Post does not exist');
      e.name = 'NotFoundError';
      throw e;
    }
    
    return createObject(post);
  },

  edit: async (request, atualId) => {
    await db.BlogPost.update(request, {
      where: {
        id: atualId,
      },
    });
  },

};

module.exports = postService;