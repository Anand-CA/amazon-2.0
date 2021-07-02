import axios from "axios";
import moment from "moment";
import { Table } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Login from "../pages/Login";
function Orders() {
  const history = useHistory();
  const user = useSelector(selectUser);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:9000/orders/${user?.id}`).then((res) => {
      setOrders(res.data);
    });
  }, []);
  const [open, setOpen] = useState(false);

  console.log("orders", orders);
  return (
    <div style={{ minHeight: "calc(100vh - 56px)" }} className="bg-gray-100 ">
      <div className="bg-gray-100 mx-auto max-w-screen-2xl">
        <h1 className="text-4xl p-3">Orders</h1>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Payment method</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Products</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {orders?.map((order) => (
              <Table.Row>
                <Table.Cell>{moment(order.date).format("LLL")}</Table.Cell>
                <Table.Cell>
                  <p> {order.deliveryDetails.address}</p>
                  <p> {order.deliveryDetails.phone_number}</p>
                  <p>{order.deliveryDetails.pincode}</p>
                  <p>{order.user?.name}</p>
                </Table.Cell>
                <Table.Cell>{order.paymentMethod}</Table.Cell>
                <Table.Cell
                  className={`${
                    order.status === "placed" ? "positive" : "negative"
                  }`}
                >
                  {order.status}
                </Table.Cell>
                <Table.Cell>
                  <div className="space-y-2 ">
                    {order.products.map((item) => (
                      <div className="">
                        <img
                          className="h-20 object-contain"
                          src={item.img}
                          alt=""
                        />
                        <p className="line-clamp-2">{item.title}</p>
                        <p>
                          <span className="font-bold">quantity:</span>{" "}
                          {item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* container */}
    </div>
  );
}

export default Orders;
