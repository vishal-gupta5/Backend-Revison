const express = require("express");
const app = express();
const PORT = 4000;

// Parsing
app.use(express.json());

app.get("/user", (req, res) => {
  res.send("Vishal Gupta");
});

app.post("/user", (req, res) => {
  console.log(req.body)
  res.send({ data: "Data saved successfully!", success: true });
});

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
