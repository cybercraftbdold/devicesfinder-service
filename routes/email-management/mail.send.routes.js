const { Router } = require("express");
const {
  sendContactMailController,
  checkVerifyEmailAddressController,
} = require("../../controller/email-management/mail.controller");
const mailSendRouter = Router();
// base path
const baseRoute = "/devicesfinder/mail";

// create mobile blog category
mailSendRouter.post(`${baseRoute}/send-contact`, sendContactMailController);
mailSendRouter.post(
  `${baseRoute}/verify-email`,
  checkVerifyEmailAddressController
);

module.exports = mailSendRouter;
