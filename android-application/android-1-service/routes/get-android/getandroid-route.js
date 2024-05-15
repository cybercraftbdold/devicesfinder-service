const { Router } = require("express");
const androidController = require("../../controller/androidController");
const androidAiRouter = Router();

androidAiRouter.get("/path", androidController);
module.exports = androidAiRouter;
