const { Router } = require("express");
const { baseRoute } = require("../../utils/constant");
const {
  getAllBlogsController,
} = require("../../controller/blog/blog.controller");

const blogRouter = Router();

blogRouter.get(`${baseRoute}/get-blogs`, getAllBlogsController);

module.exports = blogRouter;
