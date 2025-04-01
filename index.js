require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
// const { newUser, verifyPassword } = require("./Services/authService");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./views");


mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connecté"))
.catch((err) => console.error("Erreur de connexion MongoDB :", err));

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`));
