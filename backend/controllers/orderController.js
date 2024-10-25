import { response } from "express";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";
import Razorpay from "razorpay";

dotenv.config();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173"; // Fixed typo

  try {
    // Create new order in the database
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();

    // Clear the user's cart
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Create Razorpay order (amount is in paise, so multiply by 100)
    const razorpayOrder = await razorpay.orders.create({
      amount: req.body.amount * 100, // Convert to paise
      currency: "INR",
      receipt: `order_rcptid_${newOrder._id}`,
    });

    // Send the order ID and Razorpay key to the frontend
    res.json({
      success: true,
      orderId: newOrder._id,
      razorpayOrderId: razorpayOrder.id,
      razorpayKey: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error placing order" });
  }
};

const verifyOrder = async (req, res) => {
  const { success, orderId } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    }
    if (success == "false") {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// User order for frontend
const userOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Listing order for admin pannel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// api updating order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, verifyOrder, userOrder, listOrders, updateStatus };
