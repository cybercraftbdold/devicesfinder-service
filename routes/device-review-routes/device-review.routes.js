const { Router } = require("express");
const {
  createDeviceReviewController,
  getDeviceReviewController,
} = require("../../controller/device-review/device-review.controller");
const { baseRoute } = require("../../utils/constant");
const requestValidator = require("../../middleware/request-validator");
const deviceReviewSchemaValidator = require("../../validators/device-review.validator");

const deviceReviewRouter = Router();

// create device review route
deviceReviewRouter.post(
  `${baseRoute}/create-device-review`,
  requestValidator(deviceReviewSchemaValidator),
  createDeviceReviewController
);

// get device review route
deviceReviewRouter.get(
  `${baseRoute}/get-device-reviews`,
  getDeviceReviewController
);

module.exports = deviceReviewRouter;
