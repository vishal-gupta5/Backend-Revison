const express = require("express");
require("dotenv").config();
const app = express();
const connectDB = require("../src/config/db");
const userAuth = require("./routes/user.auth.route");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

// routes
app.use("/", userAuth);

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
