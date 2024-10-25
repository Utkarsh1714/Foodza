import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://utkarshpalav17:Utkarsh%401705@cluster0.zy6ox.mongodb.net/foodza"
    )
    .then(() => console.log("DB connected"));
};
