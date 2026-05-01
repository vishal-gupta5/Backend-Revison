const express = require("express");
const app = express();
const PORT = 4000;

app.use(express.json());

// Database
const foodMenu = [
  { id: 1, food: "Meggie", category: "veg", price: 500 },
  { id: 2, food: "Pizza", category: "veg", price: 300 },
  { id: 3, food: "Burger", category: "veg", price: 150 },
  { id: 4, food: "Chicken Biryani", category: "non-veg", price: 400 },
  { id: 5, food: "Egg Roll", category: "non-veg", price: 120 },
];

const addToCard = [];

// Authentication here 
app.use("/admin", (req, res, next) => {
  const token = "ABCDEF";
  const Access = token === "ABCDEF" ? 1 : 0;

  if (!Access) {
    res.status(401).send("Unathorized Access");
  }
  next();
});

app.get("/food", (req, res) => {
  res.status(200).send({ data: foodMenu, success: true });
});

app.post("/admin", (req, res) => {
  foodMenu.push(req.body);
  res.status(201).send("Item added successfully!");
});

app.delete("/admin/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = foodMenu.find((index) => index.id === id);

  if (index === -1) {
    res.status(404).send("Item doesn't exist!");
  } else {
    foodMenu.splice(index, 1);
    res.status(200).send("Item successfully deleted!");
  }
  res.status(201).send("Item added successfully!");
});

app.patch("/admin", (req, res) => {
  const id = parseInt(req.body.id);

  const foodData = foodMenu.find((item) => item.id === id);
  console.log(foodData);

  if (foodData) {
    if (req.body.food) {
      foodData.food = req.body.food;
    }

    if (req.body.category) {
      foodData.category = req.body.category;
    }

    if (req.body.price) {
      foodData.price = req.body.price;
    }

    res.status(200).send({ message: "Successfully Updated", data: foodData });
  } else {
    return res.status(404).send("Item doesn't exist");
  }
});

app.listen(PORT, () => {
  console.log(`App is running at PORT ${PORT}`);
});
