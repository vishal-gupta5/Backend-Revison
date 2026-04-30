const express = require("express");
const app = express();
const PORT = 4000;

// app.use("/",(req, res, next) => {
//   console.log("first")
//   // res.send("Hello World!");
//   console.log("first first");
//   next();  // middleware
// },
//   // Request Handler
// (req, res) => {
//   console.log("Second");
//   res.send("Hello I'm second")
// }
// )

// Middleware
app.use("/user", (req, res, next) => {
  console.log(`${Date.now()} ${req.method} ${req.url}`);
  next();
})

// Request Handlers 

app.get("/user", (req, res) => {
  res.send("Info about user!");
});

app.post("/user", (req, res) => {
  res.send("Saved user Info!");
});

app.delete("/user", (req, res) => {
  res.send("Delete user Info!");
});

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
