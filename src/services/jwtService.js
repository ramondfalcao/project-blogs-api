require('dotenv/config');
const jwt = require('jsonwebtoken');

const jwtService = {
  createToken: (data) => {
    const token = jwt.sign({ data }, process.env.JWT_SECRET);
    return token;
  },

  validateToken: (token) => {
    try {
      const value = jwt.verify(token, process.env.JWT_SECRET);
      return value;
    } catch (e) {
      const error = new Error('Expired or invalid token');
      error.name = 'UnauthorizedError';
      throw error; 
    }
  },

  getUserEmail: (token) => {
    const { data } = jwt.verify(token, process.env.JWT_SECRET);

    return data;
  },
};

module.exports = jwtService;