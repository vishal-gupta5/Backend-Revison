const express = require("express");
const app = express();
const PORT = 4000;

app.use("/", (req, res) => {
    res.send("Testing Route")
})

app.listen(PORT, () => {
    console.log(`The server is running at PORT ${PORT}`);
})