const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

async function updateUser(username, email, password, confirmPassword, userData) {
    if (password && password.length < 6) {
      return { success: false, message: "Le mot de passe doit contenir au moins 6 caractères !" };
    }
  
    if (password && confirmPassword !== password) {
      return { success: false, message: "Les mots de passe ne correspondent pas !" };
    }
  
    try {
      let user = await User.findById(userData._id);
      if (!user) {
        return { success: false, message: "Utilisateur introuvable !" };
      }
  
      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }
  
      if (username) {
        user.username = username;
      }
  
      if (email) {
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser._id.toString() !== user._id.toString()) {
          return { success: false, message: "Cet email est déjà utilisé." };
        }
        user.email = email;
      }
  
      await user.save();
  
      return { success: true, message: "Utilisateur mis à jour avec succès !", user };
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
      return { success: false, message: "Erreur interne du serveur." };
    }
  }
  

module.exports = { updateUser };
