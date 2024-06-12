const { Router } = require("express");
const {
  createDeviceReviewController,
} = require("../../controller/device-review/device-review.controller");
const { baseRoute } = require("../../utils/constant");
const requestValidator = require("../../middleware/request-validator");
const deviceReviewSchemaValidator = require("../../validators/device-review.validator");

const deviceReviewRouter = Router();

// create specification route
deviceReviewRouter.post(
  `${baseRoute}/create-device-review`,
  requestValidator(deviceReviewSchemaValidator),
  createDeviceReviewController
);

module.exports = deviceReviewRouter;
