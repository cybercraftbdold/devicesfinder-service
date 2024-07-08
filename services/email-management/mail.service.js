const { v4: uuidv4 } = require("uuid"); // For generating unique tokens
const { FRONTEND_BASE_URL } = require("../../utils/env.config");
const MailModel = require("../../models/email-management/mail.model");
const { sendEmail } = require("../../helpers/sendEmail");
const { emailCollection } = require("../../utils/constant");
const {
  verifyEmailTemplete,
} = require("../../utils/html-templete/html.templete");

// send contact email
const sendContactMailService = async (payload) => {
  const { email, name, place, websiteName, isVerified, subject, html } =
    payload;
  try {
    const checkExsistingEmail = await MailModel.findOne({
      email: payload?.email,
    });

    // Send email
    const emailSendResponse = await sendEmail(
      emailCollection.contactEmail,
      subject,
      html
    ); // to, subject, html, from
    if (checkExsistingEmail && emailSendResponse) {
      return {
        isSuccess: false,
        message: "Email has been sent successfully 📩",
      };
    }

    // Save to the database contact information
    if (emailSendResponse) {
      const emailResponse = await MailModel.create({
        name,
        email,
        place,
        websiteName,
        isVerified,
        verificationToken: uuidv4(), // Add a verification token
      });

      // Send verification email to user
      const verificationLink = `${FRONTEND_BASE_URL}/verify-email?token=${emailResponse.verificationToken}`;
      const verificationEmailHtml = verifyEmailTemplete(verificationLink);

      const emailResponseVerification = await sendEmail(
        email,
        "Email Verification",
        verificationEmailHtml
      ); // to, subject, html, from

      if (emailResponseVerification) {
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

// verirfy email address
const checkVerifyEmailAddressService = async (token) => {
  try {
    const emailRecord = await MailModel.findOne({
      verificationToken: `${token}`,
    });
    if (!emailRecord) {
      return {
        isSuccess: false,
        message: "Invalid or expired verification link.",
      };
    }
    await MailModel.updateOne(
      { verificationToken: `${token}` },
      { $set: { isVerified: true, verificationToken: null } }
    );

    return {
      isSuccess: true,
      message: "Email verified successfully!",
    };
  } catch (error) {
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};

module.exports = {
  sendContactMailService,
  checkVerifyEmailAddressService,
  checkVerifyEmailAddressService,
};
