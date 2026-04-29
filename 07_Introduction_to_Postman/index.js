const express = require("express");
const app = express();
const PORT = 4000;

// Book Store

const bookStore = [
  {id: 1, name: "English"},
]

// Parsing
app.use(express.json());

app.get("/book", (req, res) => {
  res.send(bookStore);
})

app.get("/book/:id", (req, res) => {

  const id = parseInt(req.params.id);
  const book = bookStore.find(info => info.id === id);

  res.send({data: book, success: true});
})

app.post("/addbook", (req, res) => {
  bookStore.push(req.body);
  res.send({data: bookStore, success: true});
})

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
