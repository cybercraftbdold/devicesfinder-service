const { Router } = require("express");
const androidAiRouter = require("../routes/get-android/getandroid-route");
const androidRouter = Router();

androidRouter.use(androidAiRouter);

module.exports = androidRouter;
