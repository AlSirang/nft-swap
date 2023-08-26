import mongoose from "mongoose";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const connectMongoDB =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (mongoose.connections[0]?.readyState) {
      // Use current db connection
      return handler(req, res);
    }

    try {
      await mongoose.connect(process.env.MONGODB_URI || "");
      console.log("Connected to MongoDB");
      return handler(req, res);
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      return res.status(500).json({ error: "Database connection error" });
    }
  };

export default connectMongoDB;
