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

// CATEGORY API
const categoryAPI = axios.create({
  baseURL: "http://localhost:3000/api/category",
  withCredentials: true,
});

// Categories
export const getCategories = () =>
  categoryAPI.get("/all");

export const createCategory = (data) =>
  categoryAPI.post("/add", data);

export const deleteCategory = (id) =>
  categoryAPI.delete(`/delete/${id}`);

// USER
export const loginUser = (data) =>
  userAPI.post("/login", data);

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