const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const envConfig = require("./utils/env.config");
const deviceFinderRoute = require("./routes/routes");
const port = envConfig.PORT || 8004;

const app = express();
app.use(express.json());
app.use(cors());
app.use(deviceFinderRoute);
app.get("/", (req, res) => {
  res.status(200).send("Device finder server is running");
});
mongoose
  .connect(`${envConfig.MONGODB_URI}`)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

app.listen(port, () => {
  console.log(`Device finder is running on port ${port}`);
});
