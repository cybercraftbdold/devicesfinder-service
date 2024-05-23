const { Router } = require("express");
const {
  createMobileBlogController,
  generateMobileBlogController,
  getMobileBlogController,
} = require("../../controller/mobile-specifications/mobile.blog.contoller");
const mobileBlogRouter = Router();
// base path
const baseRoute = "/mystery-box";

// generate mobile blog router
mobileBlogRouter.post(
  `${baseRoute}/generate-mobile-blog`,
  generateMobileBlogController
);
// post route for create mobile blog
mobileBlogRouter.post(
  `${baseRoute}/create-mobile-blog`,
  createMobileBlogController
);

// get all mobile blog router
mobileBlogRouter.get(`${baseRoute}/get-mobile-blogs`, getMobileBlogController);
module.exports = mobileBlogRouter;
