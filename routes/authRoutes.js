require("dotenv").config();
const express = require("express");
const router = express.Router();
const { newUser, verifyPassword } = require("../services/authService");
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const result = await newUser(username, password);

  if (!result.success) {
    return res.status(400).json(result);
  }
  res.status(201).json(result);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const result = await verifyPassword(username, password);

  if (!result.success) {
    return res.status(401).json(result);
  }
  res.status(200).json(result);
});

router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;
