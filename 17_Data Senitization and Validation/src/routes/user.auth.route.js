
const express = require("express");
const { register } = require("../controllers/user.controller");
const userAuth = express.Router();

userAuth.post("/register", register);

module.exports = userAuth;