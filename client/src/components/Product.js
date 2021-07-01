import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectCart } from "../features/cartSlice";
import { Rating } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

function Product({ id, title, rating, price, img }) {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const add = () => {
    var status = cart.find((item) => {
      return item.id === id;
    });
    if (!status) {
      dispatch(
        addToCart({
          id: id,
          title: title,
          rating: rating,
          price: price,
          img: img,
          quantity: 1,
        })
      );
    } else {
      alert("item already exist 😅 ");
    }
  };
  return (
    <div className="p-3 animate__animated animate__fadeIn  flex hover:shadow-xl transition-all duration-300	 hover:scale-105 transform flex-col bg-white space-y-1 ">
      {/* image */}
      <div className="flex-1">
        <img  className="p-2" src={img} alt="" />
      </div>
      <p className="line-clamp-2 text-xs sm:text-base sm:line-clamp-3">
        {title}
      </p>
      <div className="py-3">
        <Rating icon="star" defaultRating={rating} maxRating={5} />
      </div>
      <p className="text-xs sm:text-base">₹{price}</p>
      <button
        onClick={add}
        className="text-xs sm:text-base py-2 focus:ring-4 focus:ring-yellow-500 rounded-md px-2 bg-gradient-to-r from-yellow-400 to-yellow-500 "
      >
        Add to cart
      </button>
    </div>
  );
}

export default Product;
