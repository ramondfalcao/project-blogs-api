const { Router } = require('express');
const authController = require('../controllers/authController');
const categoriesController = require('../controllers/categoriesController');

const categoryRouter = Router();

categoryRouter.use(authController.validateToken);

categoryRouter.post('/', categoriesController.create);
categoryRouter.get('/', categoriesController.list);

module.exports = categoryRouter;