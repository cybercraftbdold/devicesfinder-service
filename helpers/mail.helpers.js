const nodemailer = require("nodemailer");
const envConfig = require("../utils/env.config");
const sendEmailToUser = async (to, html) => {
  try {
    //  Mail transporter
    const transporter = nodemailer.createTransport({
      host: envConfig.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: envConfig.SMTP_USER,
        pass: envConfig.SMTP_PASSWORD,
      },
    });

    const result = await transporter.sendMail({
      from: "noreply@nusaiba.com.bd",
      to: to,
      subject: "Please update your profile",
      html,
    });
    return result;
  } catch (error) {
    throw new error("Mail data not found", error?.message);
  }
};

module.exports = {
  sendEmailToUser,
};
