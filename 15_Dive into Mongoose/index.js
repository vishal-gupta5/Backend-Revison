const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database");
const User = require("./user.model");
dotenv.config({});
const app = express();
const PORT = 4000;

app.use(express.json());

app.use("/", (req, res) => {
  res.send("Testing Route");
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Something is missing here!!", status: false });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ message: "User is already present!", status: false });
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });

    return res
      .status(201)
      .json({ message: "User Created Successfully!", data: newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong here!", success: false });
  }
});

app.listen(PORT, () => {
  connectDB();
  console.log(`The server is running at PORT ${PORT}`);
});
