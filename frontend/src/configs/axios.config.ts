import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "http://localhost"
    : "http://localhost:3000/api";

export const httpClient = axios.create({
  baseURL,
});
