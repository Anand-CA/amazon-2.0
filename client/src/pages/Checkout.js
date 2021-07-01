import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectCart } from "../features/cartSlice";
import { Button } from "@material-ui/core";
import { selectUser } from "../features/userSlice";

function Checkout() {
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);
  const history = useHistory();
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState(null);
  const [pincode, setPincode] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [total, setTotal] = useState(null);
  console.log("cart", cart);

  const calculateSum = () => {
    var total = cart.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price * currentValue.quantity;
    }, 0);
    console.log("total", total);
    setTotal(total);
  };
  useEffect(() => {
    calculateSum();
  }, []);

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  const handleOrder = async (e) => {
    e.preventDefault();
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    axios
      .post("http://localhost:9000/place-order", {
        address: address,
        mobile_number: mobile,
        picode: pincode,
        payment_method: paymentMethod,
        products: cart,
        totalAmount: total,
        user: user,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.codStatus) {
          console.log("working...");
          history.push("/success");
        } else {
          const order = res.data;
          var options = {
            key: "rzp_test_KxkZcOPblhMJnB", // Enter the Key ID generated from the Dashboard
            amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Acme Corp",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: function (response) {
              axios
                .post("http://localhost:9000/verify-payment", {
                  payment: response,
                  order: order,
                })
                .then((res) => {
                  if (res.data.status) {
                    history.push("/success");
                  }
                });
            },
            prefill: {
              name: "Gaurav Kumar",
              email: "gaurav.kumar@example.com",
              contact: "9999999999",
            },
            notes: {
              address: "Razorpay Corporate Office",
            },
            theme: {
              color: "#3399cc",
            },
          };
          const paymentObject = new window.Razorpay(options);
          paymentObject.open();
        }
      });
  };
  return (
    <div className="">
      {/* container */}
      <div className="max-w-screen-xl space-y-8 py-3 px-5 mx-auto h-screen bg-white">
        <h1 className="font-sans pt-10 text-2xl sm:text-4xl">
          Checkout details
        </h1>
        <form
          action=""
          className="grid grid-cols-1 md:grid-cols-2 mt-10 "
          onSubmit={handleOrder}
        >
          {/* left section */}
          <div className="mb-10  pr-10 text-lg flex flex-col ">
            {/* shipping details */}
            <div>
              <h1 className="text-sm text-gray-600 font-sans border-b-2 pb-2 uppercase">
                shipping details
              </h1>
              {/* address */}
              <div className="flex flex-col">
                <label
                  className="uppercase text-xs font-sans font-semibold py-2 text-gray-500"
                  htmlFor=""
                >
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                  className="py-2 px-3 border-2"
                />
              </div>

              {/* mobile */}
              <div className="flex flex-col">
                <label
                  className="uppercase text-xs font-sans font-semibold py-2 text-gray-500"
                  htmlFor=""
                >
                  Mobile number
                </label>
                <input
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  type="number"
                  className="py-2 px-3 border-2"
                  required
                />
              </div>

              {/* pincode */}
              <div className="flex flex-col">
                <label
                  className="uppercase text-xs font-sans font-semibold py-2 text-gray-500"
                  htmlFor=""
                >
                  Pincode
                </label>
                <input
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  type="number"
                  required
                  className="py-2 px-3 border-2"
                />
              </div>
            </div>

            {/* payment method */}
            <div className="mt-14">
              <h1 className="text-sm text-gray-600 font-sans border-b-2 pb-2 uppercase">
                payment details
              </h1>

              <div className="bg-gray-100 py-7 px-5">
                {/* cod */}
                <div>
                  <input
                    type="radio"
                    id="Cod"
                    className="mr-3"
                    value="cod"
                    name="payment-method"
                    required
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label className="uppercase text-sm text-gray-500" for="Cod">
                    Cod
                  </label>
                </div>

                {/* online payment */}
                <div>
                  <input
                    type="radio"
                    name="payment-method"
                    className="mr-3"
                    id="Online"
                    required
                    value="onlinePayment"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label
                    className="uppercase text-sm text-gray-500"
                    for="Online"
                  >
                    Online payment
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* right section */}
          <div className="pb-7">
            <h1 className=" text-sm text-gray-600 font-sans border-b-2 pb-2 uppercase">
              your order
            </h1>

            {/* products */}
            <div className="font-semibold">
              {cart?.map((item) => (
                <div key={item.id} className="border-b-2 pb-2 mb-3">
                  <img className="h-14 mb-3" src={item.img} alt="" />
                  <p className="line-clamp-2">{item.title}</p>
                  <div className="mb-3 bg-gray-100 w-6 h-6 border flex justify-center">
                    <p>{item.quantity}</p>
                  </div>
                  <p>
                    ₹{item.price} × {item.quantity} = ₹
                    {item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col border-b-2 mb-4 font-bold">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between">
                <p>Shipping</p>
                <span className="text-green-500 uppercase text-sm">Free</span>
              </div>
              <div className="flex justify-between">
                <p>Total</p>
                <span>₹{total}</span>
              </div>
            </div>
            <Button
              className=" w-full py-3 px-3 bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-md focus:ring-2 ring-yellow-500"
              type="submit"
            >
              Place order
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
