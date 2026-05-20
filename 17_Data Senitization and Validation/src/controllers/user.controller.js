const express = require("express");
const router = express.Router;
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const register = async (req, res) => {
  try {
    const mandatoryField = [
      "firstName",
      "lastName",
      "age",
      "gender",
      "email",
      "password",
    ];

    const isAllowed = mandatoryField.every((k) =>
      Object.keys(req.body).includes(k),
    );

    if (!isAllowed) {
      throw new Error("Field Missing!");
    }

    const { firstName, lastName, age, gender, email, password, photo } =
      req.body;

    // Validation
    if (!firstName || !lastName || !age || !gender || !email || !password) {
      return res
        .status(400)
        .json({ message: "Something is missing here", status: false });
    }

    const user = await User.findOne({ email: email });

    if (user) {
      return res
        .status(400)
        .json({ message: "User is already present!", status: false });
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
      message: "User registered successfully!",
      data: response,
      status: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message || "Internal Server Error!",
      status: false,
    });
  }
};

module.exports = { register };
