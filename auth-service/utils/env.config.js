const envConfig = {
  MONGODB_URI: process.env.MONGODB_URI,
  RABBITMQ_URL: process.env.RABBITMQ_URL,
  PORT: process.env.PORT,
};

module.exports = envConfig;
