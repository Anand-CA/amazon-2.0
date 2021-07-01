import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";
import Success from "./pages/Success";
function App() {
  const user = true;
  console.log("😄", user);
  return (
    <div className="app">
      
      {user ? (
        <Router>
          <Switch>
            <Route path="/success">
              <Success />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/orders">
              <Header />
              <Orders />
            </Route>
            <Route path="/checkout">
              <Header />
              <Checkout />
            </Route>
            <Route path="/cart">
              <Header />
              <Cart />
            </Route>
            <Route exact path="/">
              <Header />
              <Main />
            </Route>
          </Switch>
        </Router>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
