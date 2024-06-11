const { Router } = require("express");
const { baseRoute } = require("../../utils/constant");
const {
  getAllBlogsController,
  getSingleBlogController,
} = require("../../controller/blog/blog.controller");

const blogRouter = Router();

blogRouter.get(`${baseRoute}/get-blogs`, getAllBlogsController);
blogRouter.get(`${baseRoute}/get-single-blog/:id`, getSingleBlogController);

module.exports = blogRouter;
