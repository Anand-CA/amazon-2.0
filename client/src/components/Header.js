import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

function Header() {
  return (
    <div className="bg-black sticky top-0 z-10">
      {/* container */}
      <div className="h-16 px-3 flex items-center ">
        <img
          className="h-10 mr-7"
          src="https://mikekitko.com/wp-content/uploads/2019/10/amazon-logo-white.png"
          alt=""
        />

        {/* search */}
        <div className="flex rounded-md overflow-hidden ">
          <input type="text" className="focus:outline-none border:none px-3" />
          {/* icon */}
          <div className="bg-yellow-500">
            <IconButton>
              <SearchIcon />
            </IconButton>
          </div>
        </div>

        {/* nav items */}
        <div className="text-white ml-auto">
          <ul className="flex items-center space-x-5">
            <li className="font-bold">Hello, Anand</li>
            <li className="flex flex-col">
              Returns <span className="font-bold">& Orders</span>
            </li>
            <li>
              <IconButton>
                <ShoppingCartIcon fontSize="large" style={{ color: "#fff" }} />
              </IconButton>
              <span className="font-bold">3</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
