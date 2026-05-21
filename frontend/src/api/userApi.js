import axios from "axios";

// USER API
const userAPI = axios.create({
  baseURL: "http://localhost:3000/api/user",
  withCredentials: true,
});

// ADMIN API
const adminAPI = axios.create({
  baseURL: "http://localhost:3000/api/admin",
  withCredentials: true,
});

// USER
export const loginUser = (data) => userAPI.post("/login", data);
export const registerUser = (data) => userAPI.post("/register", data);

// ADMIN
export const loginAdmin = (data) => adminAPI.post("/login", data);