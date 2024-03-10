import mongoose from "mongoose";

let cached = {conn: null, promise: null};

const MONGODB_URL = process.env.MONGODB_URL;

export const connectToDatabase = async () => {
  if (cached.conn) {
    //console.log("Using cached database instance");
    return cached.conn;
  }

  if (!MONGODB_URL) throw new Error("Missing MONGODB_URL");

  //console.log("Attempting to connect to database...");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "imaginify",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  //console.log("Successfully connected to the database");

  return cached.conn;
};
