const envConfig = {
  // additional env file
  MONGODB_URI: process.env.MONGODB_URI,
  RABBITMQ_URL: process.env.RABBITMQ_URL,
  PORT: process.env.PORT,
  FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL,
  BOX_SERVER_BASE_URL: process.env.BOX_SERVER_BASE_URL,
  // json web token env
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
  // smtp env file
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SMTP_HOST: process.env.SMTP_HOST,
};

module.exports = envConfig;
