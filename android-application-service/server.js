const express = require("express");
const mongoose = require("mongoose");
const androidRouter = require("./routes/routes");

const app = express();
app.use(express.json());
app.use(androidRouter);

mongoose
  .connect("mongodb://mongo-users:27017/android-application")
  // .connect("mongodb://localhost:27017/android-application")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

const port = process.env.PORT || 8001;
process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled Rejection at:", p, "reason:", reason);
  // application specific logging, throwing an error, or other logic here
});

app.listen(port, () => {
  console.log(`Android Application is running on port ${port}`);
});
