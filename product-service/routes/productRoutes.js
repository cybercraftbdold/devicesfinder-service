const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { getUserData } = require("../messageConsumer/startAllUserConsumer");

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/users", (req, res) => {
  const allUsers = getUserData();
  res.json(allUsers);
});

module.exports = router;
