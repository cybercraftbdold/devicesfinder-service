const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const startConsumer = require("./messageConsumer/startConsumer"); // Assumes your startConsumer function is exported from messageConsumer.js
const { startAllUsersConsumer } = require("./messageConsumer/startAllUserConsumer");

const app = express();
app.use(express.json());
// Start the RabbitMQ Consumer when the server starts
startConsumer().catch((err) => {
  console.error("Failed to start the RabbitMQ Consumer:", err);
});
startAllUsersConsumer().catch(console.error);

app.use("/products", productRoutes);

mongoose
  // .connect("mongodb://mongo-products:27017/products") //for docker
  .connect("mongodb://mongo:27019/products") //for docker
  // .connect("mongodb://localhost:27017/products")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

const port = process.env.PORT || 8000;

process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled Rejection at:", p, "reason:", reason);
  // application specific logging, throwing an error, or other logic here
});

app.listen(port, () => {
  console.log(`Product Service running on port ${port}`);
});
