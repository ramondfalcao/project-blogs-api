const { Router } = require('express');
const authController = require('../controllers/authController');
const postController = require('../controllers/postController');

const postRouter = Router();

postRouter.use(authController.validateToken);

postRouter.post('/', postController.create);

postRouter.get('/', postController.list);

postRouter.get('/:id', postController.findById);

postRouter.put('/:id', postController.edit);

postRouter.delete('/:id', postController.delete);

module.exports = postRouter;