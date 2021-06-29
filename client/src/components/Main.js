import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function Main() {
  return (
    <div>
      {/* container */}
      <div className="max-w-screen-xl h-screen mx-auto bg-gray-100">
        {/* carousel */}
        <div>
          <Carousel autoPlay={true} showStatus={false}>
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
      </div>
    </div>
  );
}

export default Main;
