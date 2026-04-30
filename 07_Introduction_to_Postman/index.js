const express = require("express");
const app = express();
const PORT = 4000;

// Book Store

const bookStore = [
  {id: 1, name: "English"},
]

// Parsing
app.use(express.json());

// Show books 
app.get("/book", (req, res) => {
  res.send(bookStore);
})


// Show book using id 
app.get("/book/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = bookStore.find(info => info.id === id);
  res.send({data: book, success: true});
})

// Add book 
app.post("/book", (req, res) => {
  bookStore.push(req.body);
  res.send({data: bookStore, success: true});
})


// Update book using patch method
app.patch("/book", (req, res) => {
  const id = req.body.id;
  const book = bookStore.find(info => info.id = id);
  book.name = req.body.name;
  res.send({data: "Updated successully", success: true});
})

// Update book using post method
app.post("/book", (req, res) => {
  const id = req.body.id;
  const book = bookStore.find(info => info.id = id);
  book.name = req.body.name;
  res.send({data: "Updated successully", success: true});
})


app.delete("/book/:id", (req, res) => {
  const id = parseInt(req.body.id);
  const index = bookStore.findIndex(info => info.id === id);
  console.log(index)

  bookStore.splice(index, 1);
  res.send("Delete Successfully!")
})

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
