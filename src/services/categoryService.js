const Joi = require('joi');
const db = require('../database/models');

const categoryService = {
  validateBody: (data) => {
    const schema = Joi.object({
      name: Joi.string().required(),
    });

    const { error, value } = schema.validate(data);

    if (error) throw error;

    return value;
  },

  create: async ({ name }) => {
    const category = await db.Category.create({ name });
    return category;
  },

  list: async () => {
    const categories = await db.Category.findAll();
    return categories;
  },

};

module.exports = categoryService;