// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../Context Api/AuthContext";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      await signIn(email, password);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSignIn}
        className="flex flex-col justify-center items-center h-screen"
      >
        <img
          className="w-52 h-52 rounded-full border-2 border-gray-700 hover:cursor-pointer hover:rounded-xl hover:border-cyan-700 transition-all duration-500 ease-in-out "
          src="/hello_mama.jpeg"
        />
        <p className="text-xl mb-2">LogIn</p>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="input input-accent input-md"
        />
        <div className="relative mt-2.5 ">
          <input
            onChange={(event) => setPassword(event.target.value)}
            className="flex input-md  input input-accent "
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password"
            id="password"
          />
          <button
            type="button"
            className="absolute inset-y-0 left-40  flex items-center pr-3 z-10"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 dark:text-slate-50"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 dark:text-slate-50"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </button>
        </div>

        <button type="submit" className="btn btn-md  btn-accent mt-3">
          LOGIN
        </button>
      </form>
    </>
  );
};

export default Login;
