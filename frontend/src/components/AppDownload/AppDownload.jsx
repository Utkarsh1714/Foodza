import React from "react";
import { assets } from "../../assets/frontend_assets/assets";

const AppDownload = () => {
  return (
    <>
      <div
        className="app-download m-auto mt-[100px] text-center font-medium"
        style={{ fontSize: "max(3vw, 20px)" }}
        id="app-download"
      >
        <p>
          For Better Experience <br />
          Foodza App
        </p>
        <div className="app-download-platforms flex justify-center gap-[max(2vw,10px)] mt-[40px]">
          <img
            className="max-w-[180px] transition duration-500 ease-in-out cursor-pointer hover:scale-[1.05]"
            style={{ width: "max(30vw,120px)" }}
            src={assets.play_store}
            alt=""
          />
          <img
            className="max-w-[180px] transition duration-500 ease-in-out cursor-pointer hover:scale-[1.05]"
            style={{ width: "max(30vw,120px)" }}
            src={assets.app_store}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default AppDownload;
