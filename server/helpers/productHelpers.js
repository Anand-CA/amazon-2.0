const db = require("../config/connection");
const bcrypt = require("bcrypt");
const Razorpay = require("razorpay");
const crypto = require("crypto");
var ObjectId = require("mongodb").ObjectID;

module.exports = {
  getProducts: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection("products")
        .find()
        .toArray()
        .then((res) => {
          resolve(res);
        });
    });
  },
  addProduct: (product) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection("products")
        .insertOne(product)
        .then(() => {
          resolve();
        });
    });
  },
  placeOrder: (orderDetails) => {
    return new Promise(async (resolve, reject) => {
      var status = orderDetails.payment_method === "cod" ? "placed" : "pending";
      orderObj = {
        deliveryDetails: {
          address: orderDetails.address,
          phone_number: orderDetails.mobile_number,
          pincode: orderDetails.pincode,
        },
        products: orderDetails.products,
        status: status,
        totalAmount: orderDetails.totalAmount,
        paymentMethod: orderDetails.payment_method,
        user: orderDetails.user,
        date: new Date(),
      };
      db.get()
        .collection("orders")
        .insertOne(orderObj)
        .then((res) => {
          resolve(res.ops[0]);
        });
    });
  },
  getOrders: (userId) => {
    console.log("userId", userId);
    return new Promise((resolve, reject) => {
      db.get()
        .collection("orders")
        .find({ "user.id": userId })
        .sort({ date: -1 })
        .toArray()
        .then((res) => {
          resolve(res);
        });
    });
  },
  generateRazorpay: (orderId, total) => {
    console.log("orderId>>>", orderId);
    return new Promise((resolve, reject) => {
      var instance = new Razorpay({
        key_id: "rzp_test_KxkZcOPblhMJnB",
        key_secret: "H2iOn0nIbtcVue0wZoUoRjfk",
      });

      var options = {
        amount: total * 100, // amount in the smallest currency unit
        currency: "INR",
        receipt: orderId.toString(),
      };
      instance.orders.create(options, function (err, order) {
        console.log("errr >>", err);
        resolve(order);
      });
    });
  },
  verifyPayment: (payment, order) => {
    return new Promise(async (resolve, reject) => {
      var hmac = crypto.createHmac("sha256", "H2iOn0nIbtcVue0wZoUoRjfk");
      hmac.update(order.id + "|" + payment.razorpay_payment_id);
      hmac = hmac.digest("hex");
      if (hmac === payment.razorpay_signature) {
        resolve({ status: true });
      }
    });
  },
  changePaymentStatus: (orderId) => {
    return new Promise(async (resolve, reject) => {
      db.get()
        .collection("orders")
        .updateOne(
          { _id: ObjectId(orderId) },
          {
            $set: { status: "placed" },
          }
        )
        .then(() => {
          resolve();
        });
    });
  },
};
