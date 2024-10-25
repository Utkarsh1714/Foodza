import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="cart mt-[100px]">
        <div className="cart-items">
          <div className="grid items-center text-gray-500 cart-items-title">
            <p>Items</p>
            <p>Title </p>
            <p>Price</p>
            <p>Quantity </p>
            <p>Total </p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={item._id}>
                  <div className="cart-items-title cart-items-item">
                    <img
                      src={url + "/images/" + item.image}
                      alt=""
                      className="w-[50px]"
                    />
                    <p>{item.name}</p>
                    <p>Rs. {item.price}/-</p>
                    <p>{cartItems[item._id]}</p>
                    <p>Rs. {item.price * cartItems[item._id]}/-</p>
                    <p
                      onClick={() => removeFromCart(item._id)}
                      className="cursor-pointer cross"
                    >
                      x
                    </p>
                  </div>
                  <hr className="h-[1px] bg-[#e2e2e2] border-none" />
                </div>
              );
            }
          })}
        </div>
        <div
          className="cart-bottom mt-[80px] flex justify-between"
          style={{ gap: "max(12vw,20px)" }}
        >
          <div className="flex flex-col flex-1 gap-5 cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details flex justify-between text-[#555]">
                <p>Subtotal</p>
                <p>Rs. {getTotalCartAmount()}/-</p>
              </div>
              <hr />
              <div className="cart-total-details flex justify-between text-[#555]">
                <p>Deliver Fee</p>
                <p>Rs. {getTotalCartAmount() === 0 ? 0 : 2}/-</p>
              </div>
              <hr className="my-2.5 mx-0" />
              <div className="cart-total-details flex justify-between text-[#555]">
                <b>Total</b>
                <b>
                  Rs.{" "}
                  {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                  /-
                </b>
              </div>
            </div>
            <button
              className="border-none text-white bg-[tomato] py-3 p-0 rounded-[4px]"
              style={{ width: "max(15vw,200px)" }}
              onClick={() => navigate("/order")}
            >
              Proceed to Checkout
            </button>
          </div>
          <div className="flex-1 cart-promocode">
            <div>
              <p className="text-[#555]">
                If you have a promo code, Enter it here
              </p>
              <div className="cart-promocode-input mt-2.5 flex justify-between items-center bg-[#eaeaea] rounded-[4px]">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="bg-transparent border-none outline-none pl-2.5"
                />
                <button
                  className="py-3 px-[5px] bg-black border-none text-white rounded-[4px]"
                  style={{ width: "max(10vw, 12px)" }}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
