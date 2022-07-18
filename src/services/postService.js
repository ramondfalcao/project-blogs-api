const Joi = require('joi');
// const Sequelize = require('sequelize');
const db = require('../database/models');
// const config = require('../database/config/config');

// const sequelize = new Sequelize(config.development);

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

    categoryValidation: async (categoryIds) => {
    const categories = await db.Category.findAll({ where: { id: categoryIds } });
    if (categoryIds.length !== categories.length) {
      const e = new Error('"categoryIds" not found');
      e.name = 'ValidationError';
      throw e;
    }
  },

  create: async (title, content, userEmail, categoryIds) => {
    // try {
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
    // } catch (err) {
    //   const e = new Error('Algo deu errado');
    //   throw e;
    // }
  },

  // list: async () => {
  //   const posts = await db.BlogPost.findAll({
  //     attributes: { exclude: ['password'] },
  //   });
  //   return posts;
  // },
};

module.exports = postService;