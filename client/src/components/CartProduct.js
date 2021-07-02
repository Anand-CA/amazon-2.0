import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../features/cartSlice";
import { motion } from "framer-motion";

const CartProduct = ({ id, title, img }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [update, setUpdate] = useState(false);
  console.log("quantity >>", quantity);
  var options = [];
  for (var i = 1; i <= 5; i++) {
    options.push({
      text: i,
      value: i,
    });
  }
  console.log(quantity);

  const remove = () => {
    dispatch(
      removeFromCart({
        id: id,
      })
    );
  };
  useEffect(() => {
    if (update) {
      dispatch(
        updateQuantity({
          quantity: parseInt(quantity),
          id: id,
        })
      );
    }

    setUpdate(false);
  }, [update]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 1 }}
      transition={{ duration: 0.4 }}
      className="animate__animated animate__fadeInUp bg-white shadow-sm grid grid-cols-2 items-center my-3 px-2"
    >
      {/* left */}
      <div className="flex justify-center">
        <img
          className="transition-gpu duration-300 transform sm:hover:translate-x-4 p-3 max-h-52"
          src={img}
          alt=""
        />
      </div>

      {/* right */}
      <div>
        <p className="line-clamp-2 sm:line-clamp-3 sm:text-base text-xs">
          {title}
        </p>
        <div className="">
          <select
            value={quantity}
            onChange={(e) => {
              setQuantity(e.currentTarget.value);
              setUpdate(true);
            }}
            name="cars"
            className="border-2  sm:p-1 rounded-md"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <button
          onClick={remove}
          className="mt-4 text-xs sm:text-base py-2 focus:ring-4 rounded-md focus:ring-yellow-500 w-44 px-2 bg-gradient-to-r from-yellow-400 to-yellow-500 "
        >
          Remove
        </button>
      </div>
    </motion.div>
  );
};

export default CartProduct;
