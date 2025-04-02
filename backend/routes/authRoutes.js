require("dotenv").config();
const express = require("express");
const router = express.Router();
const { createUser, login } = require("../services/authService");
const User = require("../models/User");

// ---------------------------------------------- INSCRIPTION --------------------------------------
// router.get("/register", (req, res) => {
//     res.render("register", { error: null });
//   });
  

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  console.log(password);
  const result = await createUser(username, password);

  if (!result.success) {
    // return res.render("register", { error: result.message });
    return res.status(400).json({ result });
  }
  // res.render("welcome", { username });
  res.cookie("token", result.token, {httpOnly: true, sameSite: "lax"});
  return res.status(200).json({ result });
});

// ---------------------------------------------- CONNEXION --------------------------------------
// router.get("/login", (req, res) => {
//     res.render("login", { error: null });
//   });

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const result = await login(username, password);

  if (!result.success) {
    // return res.render("login", { error: result.message });
    return res.status(400).json({ result });
  }
  // res.render("welcome", { username });
  res.cookie("token", result.token, {httpOnly: true, sameSite: "lax"});
  return res.status(200).json({ result });
});

router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;
