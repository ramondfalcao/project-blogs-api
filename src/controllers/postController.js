const jwtService = require('../services/jwtService');
const postService = require('../services/postService');

const postController = {
  create: async (req, res) => {
    const { authorization } = req.headers;

    const request = await postService.validateBody(req.body);
    const userEmail = await jwtService.getUserEmail(authorization);
    
    await postService.categoryValidation(request.categoryIds);
    
    const { dataValues } = await postService
    .create(request.title, request.content, userEmail, request.categoryIds);
    
    console.log(dataValues);
    return res.status(201).json(dataValues);
  },

  list: async (_req, res) => {
    const users = await postService.list();
    res.status(200).json(users);
  },
};

module.exports = postController;