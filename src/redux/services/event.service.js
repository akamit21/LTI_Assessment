import axios from "axios";

let config = {
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json"
  }
};

export const fetchAll = () => {
  return axios.get("/events", config);
};

export const fetchById = (id) => {
  console.log(id)
  return axios.get("/events/" + id, config);
};

export const addEvent = (data) => {
  return axios.post("/events", { ...data }, config);
};

export const updateEvent = (data, id) => {
  return axios.patch("/events/" + id, { ...data }, config);
};