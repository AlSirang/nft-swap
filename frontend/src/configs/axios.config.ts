import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://nft-swap-sigma.vercel.app/api"
    : "http://localhost:3000/api";

export const httpClient = axios.create({
  baseURL,
});
