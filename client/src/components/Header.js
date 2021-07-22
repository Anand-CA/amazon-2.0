import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import {  Dropdown } from "semantic-ui-react";
import { IconButton } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCart,
  selectSearchTerm,
  setSearchTerm,
} from "../features/cartSlice";
import { logout, selectUser } from "../features/userSlice";
import { auth } from "../firebase";
function Header() {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);
  const history = useHistory();
  
  return (
    <div className="bg-black sticky top-0 z-10">
      {/* container */}
      <div className="h-16 px-3 flex items-center ">
        <Link to="/">
          <img
            className="cursor-pointer h-8 md:ml-2 sm:h-12 mr-7"
            src="/images/amazon-logo.png"
            alt=""
          />
        </Link>

        {/* search */}
        <div className="sm:flex hidden rounded-md overflow-hidden ">
          <input
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            type="text"
            className="focus:outline-none border:none px-3"
          />
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
            <li className=" no-underline	mr-3 text-xs sm:text-sm flex flex-col">
              Hello,
              <Dropdown
                text={user ? user.name || user.email : "Login"}
                pointing
                className="link item"
              >
                <Dropdown.Menu>
                  {user ? (
                    <Dropdown.Item
                      onClick={() => {
                        auth.signOut();
                        dispatch(logout());
                      }}
                    >
                      sign out
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item onClick={() => history.push("/login")}>
                      Login
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <Link to="/orders">
              <li className="no-underline text-xs sm:text-sm text-white flex flex-col">
                Returns{" "}
                <span className="font-bold text-xs sm:text-sm">& Orders</span>
              </li>
            </Link>

            <Link to="/cart">
              <li className="relative no-underline	">
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
