import axios from "axios";

let config = {
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json"
  }
};

export const fetchAllUsers = () => {
  return axios.get("users", config);
};