const { Router } = require('express');
const authController = require('../controllers/authController');
const usersController = require('../controllers/usersController');

const userRouter = Router();

userRouter.post('/', usersController.create);

userRouter.use(authController.validateToken);

userRouter.get('/', usersController.list);

module.exports = userRouter;