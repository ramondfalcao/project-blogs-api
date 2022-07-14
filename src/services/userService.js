const Joi = require('joi');
const db = require('../database/models');
const jwtService = require('./jwtService');

const usersService = {
  validateBody: (data) => {
    const schema = Joi.object({
      displayName: Joi.string().required().min(8),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
      image: Joi.string().required().uri(),
    });

    const { error, value } = schema.validate(data);

    if (error) throw error;

    return value;
  },

  list: async () => {
    const users = await db.User.findAll({
      attributes: { exclude: ['password'] },
    });
    return users;
  },

  create: async ({ displayName, email, password, image }) => {
    const user = await db.User.create({ displayName, email, password, image });
    const token = jwtService.createToken(user.email);
    return token;
  },

  checkIfExists: async ({ _displayName, email, _password, _image }) => {
    const user = await db.User.findOne({ where: { email } });

    if (user) {
      const err = new Error('User already registered');
      err.name = 'ConflictError';
      throw err;
    }
    return true;
  },

};

module.exports = usersService;