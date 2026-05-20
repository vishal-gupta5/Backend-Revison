const express = require("express");
require("dotenv").config();
const app = express();
const connectDB = require("../src/config/db");
const User = require("./models/user.model");

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, age, gender, email, password, photo } =
      req.body;

    // Validation
    if (
      !firstName ||
      !lastName ||
      !age ||
      !gender ||
      !email ||
      !password ||
      !photo
    ) {
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

    const response = await User.create({
      firstName,
      lastName,
      age,
      gender,
      email,
      password,
      photo,
    });

    return res.status(201).json({
      message: "User registered successfully!",
      data: response,
      status: true,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error!", status: false });
  }
});

connectDB()
  .then(() => {
    console.log("Database Connection is established!");
    app.listen(PORT, () => {
      console.log(`Server is successfully running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database can't be connected!");
  });
