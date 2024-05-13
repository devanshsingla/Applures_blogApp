const express = require('express');
const blogRouter = express.Router();
const blogController = require('../controller/blogController');
const {auth} = require('../middleware/middleware')

blogRouter.get('/getAllBlog',blogController.getAllBLog);
blogRouter.get('/getAllLikes',auth,blogController.getLikes)
blogRouter.post('/createBlog',auth,blogController.createBlog);
blogRouter.patch('/updateBlog');
blogRouter.delete('/deleteBlog');
blogRouter.post('/likeBlog',auth ,blogController.likes)
blogRouter.post('/Comment')
blogRouter.get('/allcomments')



module.exports = blogRouter;
