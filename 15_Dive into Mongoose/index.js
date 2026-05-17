const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database");
dotenv.config({})
const app = express();
const PORT = 4000;

app.use("/", (req, res) => {
    res.send("Testing Route")
})

app.listen(PORT, () => {
    connectDB();
    console.log(`The server is running at PORT ${PORT}`);
})