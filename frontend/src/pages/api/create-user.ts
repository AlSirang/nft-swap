import type { NextApiRequest, NextApiResponse } from "next";
import connectMongoDB from "@/middleware/mongodb";
import { User } from "@/models";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method?.toLocaleLowerCase();

  if (method !== "post")
    return res.status(405).json({ message: "method not supported" });

  const { address } = req.body;

  if (!address)
    return res.status(422).json({ message: "address not specified" });

  if (!/^0x[a-fA-F0-9]{40}$/.test(address))
    return res.status(422).json({ message: "address not correct" });

  const result = await User.findOneAndUpdate(
    { address: address },
    { address: address },
    { upsert: true, new: true }
  );

  res.status(201).json(result);
}

export default connectMongoDB(handler);
