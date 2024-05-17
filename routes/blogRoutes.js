const express = require('express');
const blogRouter = express.Router();

blogRouter.get('/getAllBlog');

module.exports = blogRouter;
