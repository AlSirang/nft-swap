import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const userSchema = new Schema(
  {
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export { User };
