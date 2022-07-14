const Joi = require('joi');
const db = require('../database/models');
const jwtService = require('./jwtService');

const authService = {
  validateBody: (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
    });

    const { error, value } = schema.validate(data);

    if (error) {
      const err = new Error('Some required fields are missing');
      err.name = 'ValidationError';
      err.status = 400;
      throw err;
    } 
    
    return value;
  },

  login: async (email, password) => {
    const user = await db.User.findOne({ where: { email } });

    if (!user || user.password !== password) {
      const err = new Error('Invalid fields');
      err.name = 'UnauthorizedError';
      err.status = 400;
      throw err;
    }

    const token = jwtService.createToken(email);

    return token;
  },

  validateToken: (token) => {
    const data = jwtService.validateToken(token);

    return data;
  },
};

module.exports = authService;