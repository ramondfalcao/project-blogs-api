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
    
    return res.status(201).json(dataValues);
  },

  list: async (_req, res) => {
    const posts = await postService.list();
    
    res.status(200).json(posts);
  },

  findById: async (req, res) => {
    const post = await postService.findById(req.params.id);

    res.status(200).json(post);
  },

  edit: async (req, res) => {
    const { authorization } = req.headers;
    const { id } = req.params;

    const request = await postService.validateBodyUpdated(req.body);
    const userEmail = await jwtService.getUserEmail(authorization);
    const post = await postService.findById(id);

    await postService.userAuthorization(post.userId, userEmail);
   
    await postService.edit(request, id);
    const editedPost = await postService.findById(id);

    res.status(200).json(editedPost);
  },

  delete: async (req, res) => {
    const { authorization } = req.headers;
    const { id } = req.params;

    const userEmail = await jwtService.getUserEmail(authorization);
    const post = await postService.findById(id);
    await postService.userAuthorization(post.userId, userEmail);

    await postService.delete(userEmail);
    res.sendStatus(204);
  },
};

module.exports = postController;