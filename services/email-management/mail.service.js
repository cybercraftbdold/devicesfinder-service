const { sendEmail } = require("../../helpers/sendEmail");
const MailModel = require("../../models/email-management/mail.model");
const { emailCollection } = require("../../utils/constant");
// send email for contact and save email info to database
const sendContactMailService = async (payload) => {
  const { email, name, place, websiteName, status, subject, html } = payload;
  // TODO: Should be desing html
  try {
    const checkExsistingEmail = await MailModel.findOne({
      email: payload?.email,
    });
    // send email
    const emailSendResponse = await sendEmail(
      emailCollection.contactEmail,
      subject,
      html
    ); // to, subject, html, from
    if (checkExsistingEmail && emailSendResponse)
      return {
        isSuccess: false,
        message: "Email has been sent successfully 📩",
      };

    // save  to the database contact information
    if (emailSendResponse) {
      const emailResponse = await MailModel.create({
        name,
        email,
        place,
        websiteName,
        status,
      });

      if (emailResponse) {
        return {
          isSuccess: true,
          response: emailResponse,
          message:
            "Email has been sent successfully. Please check your inbox and verify the email address 📩",
        };
      }
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};

module.exports = {
  sendContactMailService,
};
