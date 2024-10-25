import React from "react";
import "./Order.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { assets } from "../../assets/assets";

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const statusHandler = async (e, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: e.target.value,
    });

    if (response.data.success) {
      await fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <>
      <div className="order add">
        <h3>Order Page</h3>
        <div className="order-list">
          {orders.map((order, index) => (
            <div className="grid order-item" key={index}>
              <img src={assets.parcel_icon} alt="parcel-icon" />
              <div>
                <p className="font-semibold order-item-food">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x" + item.quantity;
                    } else {
                      return item.name + " x" + item.quantity + ", ";
                    }
                  })}
                </p>
                <p className="font-semibold order-item-name mt-[30px] mb-[5px]">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div className="order-item-address mb-2.5">
                  <p>{order.address.street + ", "}</p>
                  <p>
                    {order.address.city +
                      ", " +
                      order.address.state +
                      ", " +
                      order.address.country +
                      ", " +
                      order.address.zipcode}
                  </p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>Rs. {order.amount}</p>
              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
                className="bg-[#ffe8e4] border border-[tomato] p-2.5 outline-none"
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delevery">Out for delevery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Order;
