import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  return (
    <>
      <div className="navbar flex justify-between items-center py-[8px] px-[4%]">
        <div>
          <h1 className="text-5xl font-bold text-orange-500 logo">Foodza</h1>
          <p className="text-lg text-gray-500">Admini Panel</p>
        </div>
        <img className="profile w-[40px]" src={assets.profile_image} alt="" />
      </div>
    </>
  );
};

export default Navbar;
