const express = require("express");
const db = require("./config/connection");
const productHelpers = require("./helpers/productHelpers");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 9000;

// middleware
app.use(express.json());
app.use(cors());

// db
db.connect((err) => {
  if (err) console.log("connection error");
  else console.log("connected sucessfully👍");
});

// routes
app.get("/", (req, res) => {
  res.send("working🚀 ");
});
app.post("/register", (req, res) => {
  productHelpers.register(req.body).then((response) => {
    res.send(response);
  });
});
app.get("/products", (req, res) => {
  productHelpers.getProducts().then((response) => {
    res.send(response);
  });
});

app.post("/add-product", (req, res) => {
  console.log(req.body);
  productHelpers.addProduct(req.body);
});

app.post("/place-order", (req, res) => {
  console.log(req.body);
  productHelpers.placeOrder(req.body).then((response) => {
    if (req.body.payment_method === "cod") {
      res.send({ codStatus: true });
    } else if (req.body.payment_method === "onlinePayment") {
      productHelpers
        .generateRazorpay(response._id, response.totalAmount)
        .then((order) => {
          console.log("order", order);
          res.send(order);
        });
    }
  });
});
app.post("/verify-payment", (req, res) => {
  console.log("order ✅", req.body);
  productHelpers
    .verifyPayment(req.body.payment, req.body.order)
    .then((response) => {
      if (response.status) {
        productHelpers.changePaymentStatus(req.body.order.receipt).then(() => {
          res.send({ status: true });
        });
      }
    });
});
app.get("/orders/:id", (req, res) => {
  productHelpers.getOrders(req.params.id).then((response) => {
    res.send(response);
  });
});

app.listen(port, () => {
  console.log(`server connected to ${port}`);
});
