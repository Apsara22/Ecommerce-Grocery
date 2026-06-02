import express from "express";

import {
  createProduct,
  getProducts,
  deleteProduct,
    updateProduct
} from "../controllers/productController.js";

const productRouter = express.Router();

// routes
productRouter.post("/add", createProduct);

productRouter.get("/all", getProducts);

productRouter.delete("/delete/:id", deleteProduct);

productRouter.put("/update/:id", updateProduct);

export default productRouter;