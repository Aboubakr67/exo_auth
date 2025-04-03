require("dotenv").config();
const express = require("express");
const router = express.Router();
const { createUser, login, generateToken } = require("../services/authService");
const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware");

// ---------------------------------------------- INSCRIPTION --------------------------------------
// router.get("/register", (req, res) => {
//     res.render("register", { error: null });
//   });
  

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const result = await createUser(username, email, password);

  if (!result.success) {
    // return res.render("register", { error: result.message });
    return res.status(400).json({ result });
  }
  // res.render("welcome", { username });
  const token = generateToken(result.user);
  res.cookie("token", token, {httpOnly: true, sameSite: "lax", maxAge: 3600000});
  console.log("Nouvelle utilisateur créée");
  console.log("Username : " + result.user.username + " - " + "Email : " + result.user.email);
  return res.status(200).json({ result });
});

// ---------------------------------------------- CONNEXION --------------------------------------
// router.get("/login", (req, res) => {
//     res.render("login", { error: null });
//   });

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await login(email, password);

  if (!result.success) {
    // return res.render("login", { error: result.message });
    return res.status(400).json({ result });
  }
  // res.render("welcome", { username });
  const token = generateToken(result.user);
  res.cookie("token", token, {httpOnly: true, sameSite: "lax", maxAge: 3600000});

  console.log("Utilisateur connecté");
  console.log("Username : " + result.user.username + " - " + "Email : " + result.user.email);
  return res.status(200).json({ result });
});


module.exports = router;
