const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const { userValidateForRegister } = require("../../validations/userValidation");

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
        success: false,
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

    const token = response.getJWT();

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const newResponse = response.toObject();
    delete newResponse.password;

    return res.status(201).json({
      message: "User registered successfully",
      data: newResponse,
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: err.message || "Internal Server Error",
      success: false,
    });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User is not present in database!",
        success: false,
      });
    }

    const isPasswordMatch = await user.verifyPassword(password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid Credentials!",
        success: false,
      });
    }

    const token = user.getJWT();

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const newUser = user.toObject();
    delete newUser.password;

    return res.status(200).json({
      message: "User login successfully!",
      data: newUser,
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: err.message || "Internal Server Error",
      success: false,
    });
  }
};

// Logout
const logout = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });

    return res
      .status(200)
      .json({ message: "User Logout successfully!", success: true });
  } catch (err) {
    console.log(err.message);
    return res
      .status(400)
      .json({ message: "Something went wrong!", success: false });
  }
};

module.exports = { register, login, logout };
