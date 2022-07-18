const { Router } = require('express');
const authController = require('../controllers/authController');
const postController = require('../controllers/postController');

const postRouter = Router();

postRouter.use(authController.validateToken);

postRouter.post('/', postController.create);

// postRouter.get('/', postController.list);

module.exports = postRouter;