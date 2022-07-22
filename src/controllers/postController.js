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

  findById: async (req, res) => {
    const user = await postService.findById(req.params.id);

    res.status(200).json(user);
  },

  edit: async (req, res) => {
    const { id } = req.params;
    const request = await postService.validateBodyUpdated(req.body);
    await postService.edit(request, id);
    const editedPost = await postService.findById(id);

    res.status(200).json(editedPost);
  },
};

module.exports = postController;