const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();
const envConfig = require("./utils/env.config");
const authenticationRouter = require("./routes/routes");
const port = envConfig.PORT || 8003;

const app = express();
app.use(express.json());
app.use(cors());
app.use(authenticationRouter);
app.get("/", (req, res) => {
  res.status(200).send("Auth server is running");
});
mongoose
  // .connect("mongodb://mongo:27017/android-applications")
  .connect(`${envConfig.MONGODB_URI}`)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled Rejection at:", p, "reason:", reason);
  // application specific logging, throwing an error, or other logic here
});

app.listen(port, () => {
  console.log(`Auth is running on port ${port}`);
});
