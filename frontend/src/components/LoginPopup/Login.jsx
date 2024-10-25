import React, { useContext, useState } from "react";
import "./Login.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Login = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currenState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if (currenState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <>
      <div className="login-popup absolute z-10 w-full h-full bg-[#00000090] grid">
        <form
          onSubmit={onLogin}
          className="login-popup-container place-self-center text-[#808080] bg-white flex flex-col gap-[25px] py-[25px] px-[30px] rounded-[8px] text-[14px]"
        >
          <div className="flex items-center justify-between text-black login-popup-title">
            <h2>{currenState}</h2>
            <img
              onClick={() => setShowLogin(false)}
              src={assets.cross_icon}
              alt=""
              className="w-[16px] cursor-pointer"
            />
          </div>
          <div className="login-popup-inputs flex flex-col gap-[20px]">
            {currenState === "Login" ? (
              <></>
            ) : (
              <input
                onChange={onChangeHandler}
                name="name"
                value={data.name}
                className="outline-none border border-[#c9c9c9] p-2.5 rounded-[4px]"
                type="text"
                placeholder="Your name"
                required
              />
            )}
            <input
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              className="outline-none border border-[#c9c9c9] p-2.5 rounded-[4px]"
              type="email"
              placeholder="Your email"
              required
            />
            <input
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              className="outline-none border border-[#c9c9c9] p-2.5 rounded-[4px]"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="border-none p-2.5 rounded-[4px] text-white bg-[tomato] text-[15px] cursor-pointer"
          >
            {currenState === "Sign Up" ? "Create Account" : "Login"}
          </button>
          <div className="login-popup-condition flex items-start gap-2 -mt-[15px]">
            <input className="mt-[5px]" type="checkbox" required />
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
          </div>
          {currenState === "Login" ? (
            <p>
              Crate a new accoutn?{" "}
              <span
                className="text-[tomato] font-medium cursor-pointer"
                onClick={() => setCurrentState("Sign Up")}
              >
                Click here
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                className="text-[tomato] font-medium cursor-pointer"
                onClick={() => setCurrentState("Login")}
              >
                Login here
              </span>
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default Login;
