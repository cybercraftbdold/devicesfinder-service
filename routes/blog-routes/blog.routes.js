const { Router } = require("express");
const { baseRoute } = require("../../utils/constant");
const {
  createBlogController,
  getAllBlogsController,
  getSingleBlogController,
} = require("../../controller/blog/blog.controller");

const blogRouter = Router();

blogRouter.post(`${baseRoute}/create-blog`, createBlogController);
blogRouter.get(`${baseRoute}/get-blogs`, getAllBlogsController);
blogRouter.get(`${baseRoute}/get-single-blog/:id`, getSingleBlogController);

module.exports = blogRouter;
