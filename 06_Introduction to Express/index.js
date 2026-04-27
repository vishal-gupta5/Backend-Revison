const express = require("express");
const app = express();
const PORT = 4000;

app.use((req, res) => {
    res.send("Hello Duniya!");
})

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
