import type { NextApiRequest, NextApiResponse } from "next";
import connectMongoDB from "@/middleware/mongodb";
import { User } from "@/models";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method?.toLocaleLowerCase();

  if (method !== "get")
    return res.status(405).json({ message: "method not supported" });

  const result = await User.find({}).limit(20);
  res.status(200).json(result);
}

export default connectMongoDB(handler);
