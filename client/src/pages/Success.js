import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

function Success() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center ">
        <img className="h-52" src="man.png" alt="" />
        <h1>Order complete!✅</h1>
        <div className="p-2 space-x-3">
          <Link to="/">
            <Button variant="outlined" color="primary">
              Go to home
            </Button>
          </Link>
          <Link to="/orders">
            <Button variant="outlined" color="secondary">
              Go to orders
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Success;
