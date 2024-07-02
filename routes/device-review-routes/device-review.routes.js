const { Router } = require("express");
const {
  createDeviceReviewController,
  getDeviceReviewController,
  deleteDeviceReviewController,
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

// delete device review route
deviceReviewRouter.delete(
  `${baseRoute}/delete-device-review/:id`,
  deleteDeviceReviewController
);

module.exports = deviceReviewRouter;
