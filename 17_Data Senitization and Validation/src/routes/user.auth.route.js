const express = require("express");
const { register, login } = require("../controllers/user.controller");
const auth = require("../middleware/auth");
const userAuth = express.Router();

userAuth.post("/register", auth, register);
userAuth.post("/login", auth, login);

module.exports = userAuth;
