const { checkIfExists } = require('../services/userService');
const usersService = require('../services/userService');

const usersController = {
  create: async (req, res) => {
    const { displayName, email, password, image } = usersService.validateBody(req.body);
    await checkIfExists({ displayName, email, password, image });
    const token = await usersService.create({ displayName, email, password, image });

    res.status(201).json({ token });
  },
};

module.exports = usersController;