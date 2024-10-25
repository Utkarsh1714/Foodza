import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar w-[18%] min-h-[100vh] border-[1.5px] border-[#a9a9a9] border-t-0">
      <div className="sidebar-options pt-[50px] pl-[20%] flex flex-col gap-[20px]">
        <NavLink
          to="/add"
          className="sidebar-option cursor-pointer flex items-center gap-3 border border-[#a9a9a9] border-r-0 py-2 px-2.5"
        >
          <img src={assets.add_icon} alt="" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>
        <NavLink
          to="/list"
          className="sidebar-option cursor-pointer flex items-center gap-3 border border-[#a9a9a9] border-r-0 py-2 px-2.5"
        >
          <img src={assets.order_icon} alt="" />
          <p className="hidden md:block">List Items</p>
        </NavLink>
        <NavLink
          to="/order"
          className="sidebar-option cursor-pointer flex items-center gap-3 border border-[#a9a9a9] border-r-0 py-2 px-2.5"
        >
          <img src={assets.add_icon} alt="" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
