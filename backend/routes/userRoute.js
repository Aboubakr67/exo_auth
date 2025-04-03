require("dotenv").config();
const express = require("express");
const router = express.Router();
const { updateUser } = require("../services/userService");
const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware");


router.get("/me", authMiddleware, (req, res) => {
    res.json({ success: true, user: req.user });
  });

  router.post("/logout", (req, res) => {
    res.clearCookie("token", { httpOnly: true, sameSite: "lax" });
    res.json({ success: true, message: "Déconnexion réussie" });
  });


router.get("/allusers", authMiddleware, async (req, res) => {
    if(req.user.role !== "admin") {
        return res.status(401).json({ success: false, message: "Accès non autorisé. Veuillez vous connecter." });
    }
    const users = await User.find();
    // sans les password des users
    const usersWithoutPassword = users.map(user => ({
      username: user.username,
      email: user.email,
      id: user._id,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }));
    res.json({ success: true, users: usersWithoutPassword });
  });
  
  
  router.put("/update", authMiddleware, async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    const result = await updateUser(username, email, password, confirmPassword, req.user);
  
    if (!result.success) {
      return res.status(400).json({ result });
    }

    return res.status(200).json({ result });
  });


module.exports = router;
