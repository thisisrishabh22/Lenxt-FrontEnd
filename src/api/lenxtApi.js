import axios from "axios";

export const lenxtApi = axios.create({
  baseURL: "https://lenxt-api.onrender.com",
});
