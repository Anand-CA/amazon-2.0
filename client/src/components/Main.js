import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import Product from "./Product";
import { selectSearchTerm } from "../features/cartSlice";
import { useSelector } from "react-redux";
function Main() {
  const searchTerm = useSelector(selectSearchTerm);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:9000/products").then((res) => {
      console.log(res.data);
      setProducts(res.data);
    });
  }, []);

  return (
    <div className="bg-gray-100">
      {/* container */}
      <div className="max-w-screen-2xl bg-white mx-auto ">
        {/* carousel */}
        <div>
          <Carousel
            autoPlay={true}
            infiniteLoop={true}
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
          >
            <div>
              <img
                src="https://m.media-amazon.com/images/I/817n2F4Nh2L._SX1500_.jpg"
                alt=""
              />
            </div>
            <div>
              <img src="https://m.media-amazon.com/images/I/61SROPzucIL._SX1500_.jpg" />
            </div>
            <div>
              <img src="https://m.media-amazon.com/images/I/61aUfpZteZL._SX1500_.jpg" />
            </div>
          </Carousel>
        </div>

        {/* products */}
        <div className="grid grid-cols-2 p-5 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products
            ?.filter((pro) => {
              if (searchTerm === "") {
                return pro;
              } else if (
                pro.title.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return pro;
              }
            })
            .map((product) => (
              <Product
                key={product._id}
                id={product._id}
                title={product.title}
                rating={product.rating}
                price={product.price}
                img={product.img}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
