const express = require("express");
const db = require("./config/connection");

const app = express();
const port = process.env.PORT || 9000;

// middleware
app.use(express.json());

// db
db.connect((err) => {
    if (err) console.log("connection error");
    else console.log("connected sucessfully👍");
  });

// routes
app.get("/", (req, res) => {
  res.send("working🚀 ");
});
app.listen(port, () => {
  console.log(`server connected to ${port}`);
});
