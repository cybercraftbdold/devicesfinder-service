const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const envConfig = require("./utils/env.config");
const authenticationRouter = require("./routes/routes");
const { startMobileSpecificationConsumer } = require("./utils/messageConsumer/mobileSpecificationDataConsumer");
const port = envConfig.PORT || 8004;
// Start the mobile specification consumer
startMobileSpecificationConsumer();

const app = express();
app.use(express.json());
app.use(cors());
app.use(authenticationRouter);
app.get("/", (req, res) => {
  res.status(200).send("mobile server is running");
});
mongoose
  .connect(`${envConfig.MONGODB_URI}`)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled Rejection at:", p, "reason:", reason);
  // application specific logging, throwing an error, or other logic here
});

app.listen(port, () => {
  console.log(`Mobile is running on port ${port}`);
});
