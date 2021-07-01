import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:9000/register", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log("user ", res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        const userr = localStorage.getItem("user");
        dispatch(login(JSON.parse(userr)));
      });
    setEmail("");
    setPassword("");
  };
  return (
    <div>
      {/* container */}
      <div>
        <form className="container" onSubmit={handleSubmit}>
          <h1 className="text-5xl text-center p-5">Register</h1>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
