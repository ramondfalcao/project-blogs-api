require('express-async-errors');

const express = require('express');
// const authController = require('./controllers/authController');
const authRouter = require('./routers/authRouter');

const app = express();

app.use(express.json());

app.use('/login', authRouter);
// app.use(authController.validateToken);

app.use((err, _req, res, _next) => {
  const { name, message, status } = err;
  switch (name) {
    case 'ValidationError':
      res.status(status).json({ message });
      break;
    case 'NotFoundError':
      res.status(404).json({ message });
      break;
    case 'ConflictError':
      res.status(409).json({ message });
      break;
    case 'UnauthorizedError':
      res.status(status).json({ message });
      break;
    default:
      res.status(500).json({ message });
      break;
  }
});
module.exports = app;
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
