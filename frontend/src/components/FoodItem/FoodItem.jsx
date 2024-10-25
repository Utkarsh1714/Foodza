import React, { useContext } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import "./FoodItem.css";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  return (
    <>
      <div className="food-item w-full m-auto rounded-[15px] shadow-lg hover:scale-[1.05]">
        <div className="relative food-item-img-container">
          <img
            className="w-full food-item-img rounded-t-xl h-[180px] object-cover"
            src={url + "/images/" + image}
            alt=""
          />
          {!cartItems[id] ? (
            <img
              className="add w-[35px] absolute bottom-[15px] right-[15px] rounded-full"
              onClick={() => addToCart(id)}
              src={assets.add_icon_white}
              alt=""
            />
          ) : (
            <div className="food-item-counter absolute bottom-[15px] right-[15px] flex items-center gap-2.5 p-[6px] rounded-[50px] bg-white">
              <img
                onClick={() => removeFromCart(id)}
                src={assets.remove_icon_red}
                alt=""
                className="w-[30px]"
              />
              <p>{cartItems[id]}</p>
              <img
                onClick={() => addToCart(id)}
                src={assets.add_icon_green}
                alt=""
                className="w-[30px]"
              />
            </div>
          )}
        </div>
        <div className="p-5 food-item-info">
          <div className="food-item-name-rating flex justify-between items-center mb-2.5">
            <p className="text-[20px] font-[500]">{name}</p>
            <img src={assets.rating_starts} alt="" className="w-[70px]" />
          </div>
          <p className="food-item-desc text-[#676767] text-base">
            {description}
          </p>
          <p className="food-item-price text-[tomato] text-[22px] font-[500] my-2.5 mx-0">
            Rs. {price}/-
          </p>
        </div>
      </div>
    </>
  );
};

export default FoodItem;
