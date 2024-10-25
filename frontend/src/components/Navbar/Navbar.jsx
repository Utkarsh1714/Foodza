import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between px-5 py-2 navbar">
      <Link to="/">
        <h1 className="text-5xl font-bold logo">
          Food<span className="text-orange-500">z</span>a
        </h1>
      </Link>
      <ul className="navbar-menu flex list-none gap-5 text-[#49557e] text-[16px] cursor-pointer text-left">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact-us
        </a>
      </ul>
      <div className="flex items-center gap-10 navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="relative navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="basket" />
          </Link>
          <div
            className={
              getTotalCartAmount() === 0
                ? ""
                : `dot absolute min-w-2.5 min-h-2.5 bg-[tomato] rounded-full -top-2 -right-2`
            }
          ></div>
        </div>
        {!token ? (
          <button
            onClick={() => setShowLogin(true)}
            className="bg-transparent text-[16px] text-[#49557e] border border-[tomato] py-2.5 px-[30px] rounded-full cursor-pointer hover:bg-[#fff4f2] transition-all"
          >
            sign in
          </button>
        ) : (
          <div className="relative navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown absolute hidden right-0 z-[1]">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logOut}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
