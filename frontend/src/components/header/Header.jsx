import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <>
      <div className="header h-[39vw] my-[20px] mx-auto rounded-xl">
        <div className="header-content absolute flex flex-col items-start gap-[1.5vw] max-w-[50%] bottom-[5%] left-[4vw] text-white">
          <h2 className="relative font-medium text-white bottom-[30%] text-[5vw] sm:text-[3vw] xs:text-[2vw] max-sm:text-[15px]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff3700] to-[#ffffff]">
              Order your favou
            </span>
            rite <br />
            food here
          </h2>
          <p className="header-para text-[1vw] lg:block hidden">
            Choose from a diverse menu featuring a delectable array of dishes
            crafted with the finest ingredients and culinary expertise. Our
            missin is to satisfy your cravings and elevate your dining
            experience, one delicious meal at a time.
          </p>
          <button className="border-none text-[#747474] font-medium py-[1vw] px-[2.3vw] bg-white text-[max(1vw,13px)] rounded-full">
            View Menu
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
