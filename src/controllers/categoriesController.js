const categoryService = require('../services/categoryService');

const categoriesController = {
  create: async (req, res) => {
    const { name } = categoryService.validateBody(req.body);

    const category = await categoryService.create({ name });

    res.status(201).json(category);
  },
};

module.exports = categoriesController;