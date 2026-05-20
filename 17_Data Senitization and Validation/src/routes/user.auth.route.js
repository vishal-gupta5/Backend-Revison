const express = require("express");
const { register, login } = require("../controllers/user.controller");
const userAuth = express.Router();

userAuth.post("/register", register);
userAuth.post("/login", login);

module.exports = userAuth;
