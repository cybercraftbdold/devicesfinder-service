const { Router } = require("express");
const {
  sendContactMailController,
} = require("../../controller/email-management/mail.controller");
const mailSendRouter = Router();
// base path
const baseRoute = "/mobile/mail";

// create mobile blog category
mailSendRouter.post(`${baseRoute}/send-contact`, sendContactMailController);

module.exports = mailSendRouter;
