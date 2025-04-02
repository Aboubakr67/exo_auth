const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

async function createUser(username, password) {
  if (!username || !password) {
    return { success: false, message: "Veuillez remplir tous les champs !" };
  }

  if (password.length < 6) {
    return { success: false, message: "Le mot de passe doit contenir au moins 6 caractères !" };
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return { success: false, message: "Ce nom d'utilisateur est déjà pris !" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ username, password: hashedPassword, role: "user" });
    await user.save();

    const token = generateToken(user);

    return { success: true, message: "Utilisateur créé avec succès !", token };
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    return { success: false, message: "Erreur interne du serveur." };
  }
}

async function login(username, password) {
  if (!username || !password) {
    return { success: false, message: "Veuillez remplir tous les champs !" };
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
    //   return { success: false, message: "Utilisateur non trouvé !" };
      return { success: false, message: "Nom d'utilisateur ou mot de passe incorrect !" };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(isMatch) {
      const token = generateToken(user);
      return { success: true, message: "Connexion réussie !", token };
    } else {
      return { success: false, message: "Nom d'utilisateur ou mot de passe incorrect !" }
    }

  } catch (error) {
    console.error("Erreur lors de la vérification du mot de passe :", error);
    return { success: false, message: "Erreur interne du serveur." };
  }
}

function generateToken(user) {
  return jwt.sign({ username: user.username, id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

module.exports = { createUser, login };
