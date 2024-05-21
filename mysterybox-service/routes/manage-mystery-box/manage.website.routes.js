const { Router } = require("express");
const {
  addWebsiteController,
  getWebsitesController,
} = require("../../controller/manage-mystery-box/manage.website.controller");
// base path
const baseRoute = "/mystery-box/manage";
const manageWebsiteRouter = Router();
// add website
manageWebsiteRouter.post(`${baseRoute}/add-website`, addWebsiteController);

// get all websites
manageWebsiteRouter.get(`${baseRoute}/get-websites`, getWebsitesController);
module.exports = manageWebsiteRouter;
