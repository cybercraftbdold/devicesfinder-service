const express = require("express");
const router = express.Router();
const User = require("../models/User");
const connectRabbitMQ = require("../rabbitmqConnection");

router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post("/", async (req, res) => {
  const newUser = new User(req.body);
  try {
    await newUser.save();
    // rabbitmq
    const channel = await connectRabbitMQ();
    const msg = JSON.stringify(newUser);
    channel.sendToQueue("userDataQueue", Buffer.from(msg));
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
