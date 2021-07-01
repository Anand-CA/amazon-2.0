import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import Register from "../components/Register";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
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
  console.log(toggle);
  return (
    <div className=" bg-gray-100">
      {/* container */}
      <div className="h-screen mx-auto flex px-3 py-5 flex-col max-w-2xl">
        <img className="h-24" src="amazon.svg" alt="" />
        {toggle ? (
          <Register toggle={toggle} setToggle={setToggle} />
        ) : (
          <form
            action=""
            className="p-5 bg-white space-y-3 flex flex-col  border-2"
          >
            <h1>Sign In</h1>
            <div className="flex flex-col w-full">
              <label htmlFor="">Email</label>
              <input type="text" className="p-3 border-2 " />
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="">Password</label>
              <input type="text" className="p-3 border-2 " />
            </div>
            <button className="py-3 w-full border border-black bg-gradient-to-b from-gray-100 to-yellow-400">
              Continue
            </button>
            <p className="text-center">
              By continuing, you agree to Amazon's Conditions of Use and Privacy
              Notice.
            </p>
            <button
              onClick={() => setToggle(!toggle)}
              className="py-3 mt-5 bg-gray-200 border-2 border-gray-300"
            >
              Create a new account
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
