import React from "react";
import "./Explore.css";
import { menu_list } from "../../assets/frontend_assets/assets";

const Explore = ({ category, setCategory }) => {
  return (
    <>
      <div
        className="explore-menu flex flex-col gap-[20px] my-0"
        id="explore-menu"
      >
        <h1
          className="text-[#262626] font-medium"
          style={{ fontSize: "max(2vw, 24px)" }}
        >
          Explore our menu
        </h1>
        <p className="explore-menu-text lg:max-w-[60%] max-w-full text-[#808080]">
          Choose from a diverse menu featuring a delectable array of dishes. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>
        <div className="explore-menu-list flex justify-between items-center gap-[20px] text-center my-[20px] mx-0 overflow-x-scroll whitespace-nowrap">
          {menu_list.map((item, index) => {
            return (
              <div
                onClick={() =>
                  setCategory((prev) =>
                    prev === item.menu_name ? "All" : item.menu_name
                  )
                }
                key={index}
                className="flex flex-col items-center justify-evenly h-[160px] explore-menu-list-item hover:scale-[1.05] transition-all duration-[0.5s]"
              >
                <img
                  src={item.menu_image}
                  alt=""
                  className={`${
                    category === item.menu_name ? "active" : ""
                  } w-[6.5vw] min-w-[100px] h-[6.5vw] min-h-[100px] cursor-pointer rounded-full transition-all 0.2s object-cover`}
                />
                <p className="mt-2.5 text-[#747474] text-[max(1.4vw, 16px)] text-wrap pb-10 cursor-pointer">
                  {item.menu_name}
                </p>
              </div>
            );
          })}
        </div>
        <hr className="my-[10px] mx-0 bg-[#e2e2e2] border" />
      </div>
    </>
  );
};

export default Explore;
