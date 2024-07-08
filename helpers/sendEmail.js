const nodemailer = require("nodemailer");
const envConfig = require("../utils/env.config");
/**
 * Sends an email using the specified parameters.
 *
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} html - The HTML content of the email.
 * @param {string} [from] - The sender's email address. Defaults to "noreply@nusaiba.com.bd" if not specified.
 * @returns {Promise<Object>} - The response from the email sending operation.
 */
const sendEmail = async (to, subject, html, from) => {
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
      from: from ? from : "noreply@nusaiba.com.bd",
      to: to,
      subject: subject,
      html,
    });
    return result;
  } catch (error) {
    throw new error("Mail data not found", error?.message);
  }
};

module.exports = {
  sendEmail,
};
