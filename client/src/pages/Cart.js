import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { selectCart } from "../features/cartSlice";
import CartProduct from "../components/CartProduct";
import { selectUser } from "../features/userSlice";
function Cart() {
  const cart = useSelector(selectCart);
  console.log("cart >>>", cart);
  const history = useHistory();
  const user = useSelector(selectUser);
  return (
    <div className=" bg-gray-100">
      <div
        style={{ minHeight: "calc(100vh - 56px)", height: "100%" }}
        className="px-3   py-3 max-w-screen-xl mx-auto"
      >
        <div className="py-2 px-2 border-b-2">
          <h1 className="sm:text-3xl text-xl font-semibold">Cart Items</h1>
        </div>
        {cart.length === 0 ? (
          <div
            className="flex items-center flex-col"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "100%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <img className="h-32 sm:h-40" src="bucket.png" alt="" />
            <h1 className="">Your cart is empty!</h1>
          </div>
        ) : (
          <div className="pt-4">
            {cart?.map((product) => (
              <CartProduct
                key={product.id}
                id={product.id}
                title={product.title}
                rating={product.rating}
                price={product.price}
                img={product.img}
              />
            ))}
          </div>
        )}

        {/* checkout button */}
        <div className="px-3 fixed bottom-0 right-10 flex justify-end py-5">
          {user ? (
            <Link to="/checkout">
              <button
                hidden={cart.length === 0}
                className="text-black px-3 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 focus:ring-4 rounded-md focus:ring-yellow-500"
              >
                Proceed to checkout
              </button>
            </Link>
          ) : (
            <p
              onClick={() => history.push("/login")}
              className="cursor-pointer text-black px-3 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 focus:ring-4 rounded-md focus:ring-yellow-500"
            >
              Sign in to checkout
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
