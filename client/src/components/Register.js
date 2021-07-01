import React from "react";

function Register({ toggle , setToggle }) {
  return (
    <div>
      <form action="" className="space-y-3 bg-white border p-5">
        <h1>Create account</h1>
        <div className="flex flex-col w-full">
          <label htmlFor="">Your name</label>
          <input type="text" className="p-3 border-2 " />
        </div>
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
