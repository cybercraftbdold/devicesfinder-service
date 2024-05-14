// registerion invitation templete
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

const forgotPasswordTemplete = (user, resetLink) => {
  return `<div style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); padding: 20px;">
    <h1 style="color: #007BFF;">Password Reset Request</h1>
    <p>Hi ${user?.name},</p>
    <p>We received a request to reset your password. Click the link below to reset your password:</p>

    <p style="text-align: center; margin-top: 20px;">
      <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a>
    </p>

    <p>If you did not request a password reset, please ignore this email.</p>

    <p>Thank you,</p>
    <p>Cybercraft Bangladesh</p>
  </div>
</div>`;
};

module.exports = { registrationInvitaionTemplete, forgotPasswordTemplete };
