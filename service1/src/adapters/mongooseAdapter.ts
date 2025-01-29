import mongoose from "mongoose";


const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://rohit:1LsyddOtnxWNs1sR@og.bkzn1.mongodb.net/?retryWrites=true&w=majority&appName=OG/micro';

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Connected to database successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.log("Error in connecting to database.", err);
    });

    await mongoose.connect( MONGO_URI as string);
  } catch (err) {
    console.error("Failed to connect to database.", err);
    process.exit(1);
  }
};

export default connectDB;
