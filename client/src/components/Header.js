import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../features/cartSlice";
import { logout, selectUser } from "../features/userSlice";
function Header() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser)
  return (
    <div className="bg-black sticky top-0 z-10">
      {/* container */}
      <div className="h-16 px-3 flex items-center ">
        <Link to="/">
          <img
            className="cursor-pointer h-7 md:ml-2 sm:h-10 mr-7"
            src="https://mikekitko.com/wp-content/uploads/2019/10/amazon-logo-white.png"
            alt=""
          />
        </Link>

        {/* search */}
        <div className="sm:flex hidden rounded-md overflow-hidden ">
          <input type="text" className="focus:outline-none border:none px-3" />
          {/* icon */}
          <div className="bg-yellow-500">
            <IconButton>
              <SearchIcon style={{ color: "black" }} />
            </IconButton>
          </div>
        </div>

        {/* nav items */}
        <div className="text-white ml-auto">
          <ul className="flex items-center ">
            <li>
              <button
                onClick={() => {
                  sessionStorage.clear();
                  dispatch(logout());
                }}
                className="px-4"
              >
                sign out
              </button>
            </li>
            <li className="mr-3 sm:text-md text-xs flex flex-col">
              Hello, <span className="font-bold">{user?.email}</span>{" "}
            </li>
            <Link to="/orders">
              <li className="flex sm:text-md text-xs flex-col">
                Returns <span className="font-bold">& Orders</span>
              </li>
            </Link>

            <Link to="/cart">
              <li className="relative">
                <IconButton>
                  <ShoppingCartIcon
                    fontSize="medium"
                    style={{ color: "#fff" }}
                  />
                </IconButton>
                <div className="absolute bg-yellow-500 flex items-center justify-center h-5 w-5 top-0 left-8 rounded-full ">
                  <span className=" text-white  absolute text-sm font-bold">
                    {cart?.length}
                  </span>
                </div>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
