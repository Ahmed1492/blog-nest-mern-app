import mongoose from "mongoose";

// Cache the connection across serverless invocations
let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/nest-blog`);
    isConnected = true;
    console.log("DB Connected");
  } catch (err) {
    console.error("DB connection error:", err);
    throw err; // let the caller handle it
  }
};