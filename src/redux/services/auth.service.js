import axios from "axios";

let config = {
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json"
  }
};

export const registerUser = (data) => {
  return axios.post("register", { ...data }, config);
};

export const login = (data) => {
  return axios.post("login", { ...data }, config)
};
