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

// PRODUCT API
const productAPI = axios.create({
  baseURL: "http://localhost:3000/api/product",
  withCredentials: true,
});

//Categories
export const getCategories = () =>
  axios.get("http://localhost:3000/api/category/all");
// USER
export const loginUser = (data) => userAPI.post("/login", data);

export const registerUser = (data) =>
  userAPI.post("/register", data);

// ADMIN
export const loginAdmin = (data) =>
  adminAPI.post("/login", data);

// PRODUCT
export const createProduct = (data) =>
  productAPI.post("/add", data);

export const getProducts = () =>
  productAPI.get("/all");

export const deleteProduct = (id) =>
  productAPI.delete(`/delete/${id}`);