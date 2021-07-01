import axios from "axios";
import moment from "moment";
import { Button } from "@material-ui/core";
import { Icon, Label, Menu, Table, Header, Image } from "semantic-ui-react";
import Modal from "../components/Modal";
import React, { useEffect, useState } from "react";
import CartProduct from "../components/CartProduct";
function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:9000/orders").then((res) => {
      setOrders(res.data);
    });
  }, []);
  const [open, setOpen] = useState(false);

  console.log("orders", orders);
  return (
    <div className="bg-gray-100">
      {/* container */}
      <div className=" mx-auto max-w-screen-xl">
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
                  <Button onClick={() => setOpen(true)} variant="outlined">
                    view products
                  </Button>
                </Table.Cell>
                <Modal open={open} setOpen={setOpen} />
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default Orders;
