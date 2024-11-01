import React from "react";
import "./Footer.css";
import { assets } from "../../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <>
      <div
        className="footer text-[#d9d9d9] bg-[#1e1e1e] flex flex-col items-center gap-5 py-5 px-4 pt-20 mt-[100px]"
        id="footer"
      >
        <div className="grid w-full grid-cols-3 mx-auto footer-content">
          <div className="flex flex-col items-start gap-5 footer-content-left">
            <h1 className="text-4xl font-bold text-white">
              Food<span className="text-orange-500">z</span>a
            </h1>
            <p>
              Foodza - The Food Delivery App build on MERN tech stack, it has
              all the fuctionality that a food delivery app always need.
            </p>
            <div className="flex footer-social-icons">
              <img
                className="w-[40px] mr-[15px]"
                src={assets.facebook_icon}
                alt=""
              />
              <img
                className="w-[40px] mr-[15px]"
                src={assets.twitter_icon}
                alt=""
              />
              <img
                className="w-[40px] mr-[15px]"
                src={assets.linkedin_icon}
                alt=""
              />
            </div>
          </div>
          <div className="flex flex-col gap-5 text-left lg:items-center items-left footer-content-center">
            <h2 className="text-white">COMPANY</h2>
            <ul>
              <li className="mb-2.5 cursor-pointer">Home</li>
              <li className="mb-2.5 cursor-pointer">About us </li>
              <li className="mb-2.5 cursor-pointer">Delivery </li>
              <li className="mb-2.5 cursor-pointer">Privacy Policy</li>
            </ul>
          </div>
          <div className="flex flex-col gap-5 items-left lg:items-center footer-content-right">
            <h2 className="text-white">GET IN TOUCH</h2>
            <ul>
              <li className="mb-2.5 cursor-pointer">+8097848623 </li>
              <li className="mb-2.5 cursor-pointer">contact@gmail.com</li>
            </ul>
          </div>
        </div>
        <hr className="w-full h-[2px] my-5 mx-0 bg-orange-500 border-none" />
        <p className="footer-copyright">
          Copyright 2024 © Foodza.com - All Right Reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
