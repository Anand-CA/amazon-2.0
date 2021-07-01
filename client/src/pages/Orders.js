import axios from "axios";
import React, { useEffect, useState } from "react";
import CartProduct from "../components/CartProduct";
function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:9000/orders").then((res) => {
      setOrders(res.data);
    });
  }, []);
  console.log("orders", orders);
  return (
    <div className="bg-gray-100">
      {/* container */}
      <div className=" mx-auto max-w-screen-xl">
        <h1 className="text-4xl p-3">Orders</h1>
        {orders?.map((order) => (
          <div className="bg-white m-3 p-3">
            <p>{order._id}</p>
            <p>Ordered on {order.date}</p>
            <p>
              Address: {order.deliveryDetails.address},
              {order.deliveryDetails.phone_number},
              {order.deliveryDetails.pincode}
            </p>
            <p>Payment method: {order.paymentMethod}</p>
            <p>Status: {order.status}</p>
            <div>
              {order.products.map((product) => (
                <div>
                  <div>
                    <img className="h-20" src={product.img} alt="" />
                  </div>

                  <div>
                    <p>{product.title}</p>
                    <p>{product.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <p>total: {order.totalAmount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
