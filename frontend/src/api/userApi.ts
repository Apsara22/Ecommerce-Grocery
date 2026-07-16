import axios from "axios";

const BASE_URL = "https://ecommerce-grocery-gamma.vercel.app";

// USER API
const userAPI = axios.create({
  baseURL: `${BASE_URL}/api/user`,
  withCredentials: true,
});

// ADMIN API
const adminAPI = axios.create({
  baseURL: `${BASE_URL}/api/admin`,
  withCredentials: true,
});

// PRODUCT API
const productAPI = axios.create({
  baseURL: `${BASE_URL}/api/product`,
  withCredentials: true,
});

// CATEGORY API
const categoryAPI = axios.create({
  baseURL: `${BASE_URL}/api/category`,
  withCredentials: true,
});

// Interfaces
export interface CategoryData {
  name: string;
  image: string;
}

export interface UserData {
  email: string;
  password: string;
}

export interface RegisterData extends UserData {
  name: string;
}

export interface ProductData {
  productName: string;
  desc: string;
  productPrice: number;
  productOffer: number;
  finalPrice: number;
  image: string;
  category: string;
}

// ================= CATEGORY =================

export const getCategories = () => categoryAPI.get("/all");

export const createCategory = (data: CategoryData) =>
  categoryAPI.post("/add", data);

export const deleteCategory = (id: string) =>
  categoryAPI.delete(`/delete/${id}`);

// ================= USER =================

export const loginUser = (data: UserData) =>
  userAPI.post("/login", data);

export const registerUser = (data: RegisterData) =>
  userAPI.post("/register", data);

// ================= ADMIN =================

export const loginAdmin = (data: UserData) =>
  adminAPI.post("/login", data);

// ================= PRODUCT =================

export const createProduct = (data: ProductData) =>
  productAPI.post("/add", data);

export const getProducts = () => productAPI.get("/all");

export const deleteProduct = (id: string) =>
  productAPI.delete(`/delete/${id}`);