const { Router } = require("express");
const { baseRoute } = require("../../utils/constant");
const {
  createBlogController,
  getAllBlogsController,
  getSingleBlogController,
  deleteBlogController,
  updateBlogController,
} = require("../../controller/blog/blog.controller");
const blogSchemaValidator = require("../../validators/blog.validator");
const requestValidator = require("../../middleware/request-validator");

const blogRouter = Router();

blogRouter.post(
  `${baseRoute}/create-blog`,
  requestValidator(blogSchemaValidator),
  createBlogController
);
blogRouter.get(`${baseRoute}/get-blogs`, getAllBlogsController);
blogRouter.get(`${baseRoute}/get-single-blog/:id`, getSingleBlogController);
blogRouter.delete(`${baseRoute}/delete-blog/:id`, deleteBlogController);
blogRouter.patch(`${baseRoute}/update-blog/:id`, updateBlogController);

module.exports = blogRouter;
