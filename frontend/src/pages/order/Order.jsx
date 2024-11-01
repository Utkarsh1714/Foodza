// import React, { useContext, useEffect, useState } from "react";
// import { StoreContext } from "../../context/StoreContext";
// import "./Order.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Order = () => {
//   const frontend_url = "https://foodza-frontend.onrender.com";
//   const { getTotalCartAmount, token, food_list, cartItems, url } =
//     useContext(StoreContext);

//   const isCartEmpty = Object.values(cartItems).every((count) => count === 0);

//   const [data, setData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: "",
//   });

//   const onChangeHandler = (event) => {
//     const { name, value } = event.target;
//     setData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const loadRazorpayScript = () => {
//     return new Promise((resolve, reject) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => reject(false);
//       document.body.appendChild(script);
//     });
//   };

//   const placeOrder = async (event) => {
//     event.preventDefault();

//     let orderItems = [];
//     food_list.forEach((item) => {
//       if (cartItems[item._id] > 0) {
//         orderItems.push({ ...item, quantity: cartItems[item._id] });
//       }
//     });

//     const orderData = {
//       address: data,
//       items: orderItems,
//       amount: getTotalCartAmount() + 2,
//     };

//     try {
//       const response = await axios.post(`${url}/api/order/place`, orderData, {
//         headers: { token },
//       });

//       if (response.data.success) {
//         const { razorpayOrderId, razorpayKey, orderId } = response.data;

//         await loadRazorpayScript();

//         const options = {
//           key: razorpayKey,
//           amount: orderData.amount * 100,
//           currency: "INR",
//           name: "Foodza - Food Delivery",
//           description: "Order Payment",
//           order_id: razorpayOrderId,
//           handler: function (paymentResponse) {
//             alert("Payment Successful!");
//             window.location.href = `${frontend_url}/verify?success=true&orderId=${orderId}`;
//           },
//           prefill: {
//             name: `${data.firstName} ${data.lastName}`,
//             email: data.email,
//             contact: data.phone,
//           },
//           theme: { color: "#F37254" },
//           modal: {
//             ondismiss: function () {
//               // Handle payment cancellation
//               alert("Payment Cancelled!");
//               window.location.href = `${frontend_url}/verify?success=false&orderId=${orderId}`;
//             },
//           },
//         };

//         const rzp = new window.Razorpay(options);

//         rzp.on("payment.failed", function (response) {
//           alert("Payment Failed!");
//           window.location.href = `${frontend_url}/verify?success=false&orderId=${orderId}`;
//         });

//         rzp.open();
//       } else {
//         alert("Failed to place order. Please try again.");
//       }
//     } catch (error) {
//       console.error("Razorpay order creation failed:", error.message);
//       alert("Something went wrong. Please try again.");
//     }
//   };

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!token) {
//       navigate("/cart");
//     } else if (getTotalCartAmount() === 0) {
//       navigate("/cart");
//     }
//   }, [token]);

//   return (
//     <form
//       onSubmit={placeOrder}
//       className="place-order flex items-start justify-between gap-[50px] mt-[100px]"
//     >
//       <div className="w-full place-order-left">
//         <p className="title text-[30px] font-[600] mb-[50px]">
//           Delivery Information
//         </p>
//         <div className="multi-fields">
//           <input
//             required
//             name="firstName"
//             onChange={onChangeHandler}
//             value={data.firstName}
//             type="text"
//             placeholder="First Name"
//           />
//           <input
//             required
//             name="lastName"
//             onChange={onChangeHandler}
//             value={data.lastName}
//             type="text"
//             placeholder="Last Name"
//           />
//         </div>
//         <input
//           required
//           name="email"
//           onChange={onChangeHandler}
//           value={data.email}
//           type="email"
//           placeholder="Email Address"
//         />
//         <input
//           required
//           name="street"
//           onChange={onChangeHandler}
//           value={data.street}
//           type="text"
//           placeholder="Street"
//         />
//         <div className="multi-fields">
//           <input
//             required
//             name="city"
//             onChange={onChangeHandler}
//             value={data.city}
//             type="text"
//             placeholder="City"
//           />
//           <input
//             required
//             name="state"
//             onChange={onChangeHandler}
//             value={data.state}
//             type="text"
//             placeholder="State"
//           />
//         </div>
//         <div className="multi-fields">
//           <input
//             required
//             name="zipcode"
//             onChange={onChangeHandler}
//             value={data.zipcode}
//             type="text"
//             placeholder="Zip code"
//           />
//           <input
//             required
//             name="country"
//             onChange={onChangeHandler}
//             value={data.country}
//             type="text"
//             placeholder="Country"
//           />
//         </div>
//         <input
//           required
//           name="phone"
//           onChange={onChangeHandler}
//           value={data.phone}
//           type="text"
//           placeholder="Phone"
//         />
//       </div>
//       <div className="place-order-right">
//         <div className="flex flex-col flex-1 gap-5 cart-total">
//           <h2>Cart Total</h2>
//           <div>
//             <div className="cart-total-details flex justify-between text-[#555]">
//               <p>Subtotal</p>
//               <p>Rs. {getTotalCartAmount()}/-</p>
//             </div>
//             <hr />
//             <div className="cart-total-details flex justify-between text-[#555]">
//               <p>Delivery Fee</p>
//               <p>Rs. {getTotalCartAmount() === 0 ? 0 : 2}/-</p>
//             </div>
//             <hr className="my-2.5 mx-0" />
//             <div className="cart-total-details flex justify-between text-[#555]">
//               <b>Total</b>
//               <b>
//                 Rs. {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
//                 /-
//               </b>
//             </div>
//           </div>
//           <button
//             className="border-none text-white bg-[tomato] py-3 p-0 rounded-[4px] mt-[30px]"
//             style={{ width: "max(15vw,200px)" }}
//             type="submit"
//             disabled={isCartEmpty}
//           >
//             Pay Online
//           </button>
//           <button
//             className="border-none text-white bg-[tomato] py-3 p-0 rounded-[4px] mt-[30px]"
//             style={{ width: "max(15vw,200px)" }}
//             type="submit"
//             disabled={isCartEmpty}
//           >
//             COD (Cash on Delivery)
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default Order;

import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./Order.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const frontend_url = "https://foodza-frontend.onrender.com";
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const isCartEmpty = Object.values(cartItems).every((count) => count === 0);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("online");

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => reject(false);
      document.body.appendChild(script);
    });
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({ ...item, quantity: cartItems[item._id] });
      }
    });

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
      paymentMethod, // Specify payment method
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      if (response.data.success) {
        const { razorpayOrderId, razorpayKey, orderId } = response.data;

        // If payment method is COD, complete the order directly
        if (paymentMethod === "cod") {
          alert("Order placed successfully with COD.");
          window.location.href = `${frontend_url}/verify?success=true&orderId=${orderId}`;
          return;
        }

        // For online payment, initiate Razorpay
        await loadRazorpayScript();

        const options = {
          key: razorpayKey,
          amount: orderData.amount * 100,
          currency: "INR",
          name: "Foodza - Food Delivery",
          description: "Order Payment",
          order_id: razorpayOrderId,
          handler: function (paymentResponse) {
            alert("Payment Successful!");
            window.location.href = `${frontend_url}/verify?success=true&orderId=${orderId}`;
          },
          prefill: {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            contact: data.phone,
          },
          theme: { color: "#F37254" },
          modal: {
            ondismiss: function () {
              alert("Payment Cancelled!");
              window.location.href = `${frontend_url}/verify?success=false&orderId=${orderId}`;
            },
          },
        };

        const rzp = new window.Razorpay(options);

        rzp.on("payment.failed", function (response) {
          alert("Payment Failed!");
          window.location.href = `${frontend_url}/verify?success=false&orderId=${orderId}`;
        });

        rzp.open();
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Order placement failed:", error.message);
      alert("Something went wrong. Please try again.");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form
      onSubmit={placeOrder}
      className="place-order flex items-start justify-between gap-[50px] mt-[100px]"
    >
      <div className="w-full place-order-left">
        <p className="title text-[30px] font-[600] mb-[50px]">
          Delivery Information
        </p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email Address"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip code"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
      </div>
      <div className="place-order-right">
        <div className="flex flex-col flex-1 gap-5 cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details flex justify-between text-[#555]">
              <p>Subtotal</p>
              <p>Rs. {getTotalCartAmount()}/-</p>
            </div>
            <hr />
            <div className="cart-total-details flex justify-between text-[#555]">
              <p>Delivery Fee</p>
              <p>Rs. {getTotalCartAmount() === 0 ? 0 : 2}/-</p>
            </div>
            <hr className="my-2.5 mx-0" />
            <div className="cart-total-details flex justify-between text-[#555]">
              <b>Total</b>
              <b>
                Rs. {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                /-
              </b>
            </div>
          </div>
          <button
            className="border-none text-white bg-[tomato] py-3 p-0 rounded-[4px] mt-[30px]"
            style={{ width: "max(15vw,200px)" }}
            type="submit"
            onClick={() => setPaymentMethod("online")}
            disabled={isCartEmpty}
          >
            Pay Online
          </button>
          <button
            className="border-none text-white bg-[tomato] py-3 p-0 rounded-[4px] mt-[20px]"
            style={{ width: "max(15vw,200px)" }}
            type="submit"
            onClick={() => setPaymentMethod("cod")}
            disabled={isCartEmpty}
          >
            COD (Cash on Delivery)
          </button>
        </div>
      </div>
    </form>
  );
};

export default Order;
