import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";

function Register({ toggle, setToggle }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const register = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    setUsername("");
    setEmail("");
    setPassword("");
    history.push("/");
  };
  return (
    <div>
      <form
        action=""
        onSubmit={register}
        className="space-y-3 bg-white border p-5"
      >
        <h1>Create account</h1>
        <div className="flex flex-col w-full">
          <label htmlFor="">Your name</label>
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
            type="text"
            className="p-3 border-2 "
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="">Email</label>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            type="email"
            className="p-3 border-2 "
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="">Password</label>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            required
            className="p-3 border-2 "
          />
        </div>

        <button
          type="submit"
          className="py-3 w-full border border-black bg-gradient-to-b from-gray-100 to-yellow-400"
        >
          Register
        </button>
        <p>
          Already have a account?{" "}
          <spam
            onClick={() => setToggle(!toggle)}
            className="cursor-pointer text-blue-900 underline"
          >
            Sign In
          </spam>
        </p>
      </form>
    </div>
  );
}

export default Register;
