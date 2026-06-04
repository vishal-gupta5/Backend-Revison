const express = require("express");
const { register, login, logout } = require("../controllers/user.controller");
const auth = require("../middleware/auth");
const userAuth = express.Router();

userAuth.post("/register", register);
userAuth.post("/login", login);
userAuth.post("/logout", auth, logout);

module.exports = userAuth;
