const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const {
  userValidateForRegister,
} = require("../../validations/userValidation");

// Register
const register = async (req, res) => {
  try {
    userValidateForRegister(req.body);

    const { firstName, lastName, age, gender, email, password, photo } =
      req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exists",
        status: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const response = await User.create({
      firstName,
      lastName,
      age,
      gender,
      email,
      password: hashPassword,
      photo,
    });

    return res.status(201).json({
      message: "User registered successfully",
      data: response,
      status: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: err.message || "Internal Server Error",
      status: false,
    });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User is not present in database!",
        status: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid Credentials!",
        status: false,
      });
    }

    return res.status(200).json({
      message: "User login successfully!",
      data: user,
      status: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: err.message || "Internal Server Error",
      status: false,
    });
  }
};

module.exports = { register, login };