import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import { login, logout, selectUser } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Success from "./pages/Success";
import { auth } from "./firebase";
function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //loged in......
        console.log("😊", authUser);
        dispatch(
          login({
            id: authUser.uid,
            name: authUser.displayName,
            email: authUser.email,
          })
        );
      } else {
        //created new user........
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/success">
            <Success />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/orders">
            {user ? (
              <>
                <Header /> <Orders />
              </>
            ) : (
              <Login />
            )}
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
    </div>
  );
}

export default App;
