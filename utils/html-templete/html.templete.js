const registrationInvitaionTemplete = (email, updateProfileLink) => {
  return ` <div style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); padding: 20px;">
      <h1>Welcome to Cybercraft Bangladesh!</h1>
      <p>Hi ${email},</p>
      <p>Your account has been created. Please follow the link below to update your profile:</p>

      <p style="text-align: center; margin-top: 20px;">
        <a href="${updateProfileLink}" style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px;">Update Profile</a>
      </p>

      <p>Thank you,</p>
      <p>The Cybercraft Bangladesh Team</p>
    </div>
  </div>`;
};
const verifyEmailTemplete = (verificationLink) => {
  return ` <!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 50px auto;
      background-color: #ffffff;
      padding: 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
    }
    .header h1 {
      color: #333333;
    }
    .content {
      font-size: 16px;
      line-height: 1.6;
      color: #333333;
    }
    .button {
      text-align: center;
      margin: 20px 0;
    }
    .button a {
      background-color: #4CAF50;
      color: white;
      padding: 14px 25px;
      text-decoration: none;
      display: inline-block;
      border-radius: 5px;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #777777;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Email Verification</h1>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>Thank you for getting in touch with us! Please verify your email by clicking the button below:</p>
      <div class="button">
        <a href="${verificationLink}">Verify Email</a>
      </div>
      <p>If you did not request this verification, please ignore this email.</p>
      <p>Best regards,<br>Mobiles Insight</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Mobiles Insight. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
};

module.exports = { registrationInvitaionTemplete, verifyEmailTemplete };
