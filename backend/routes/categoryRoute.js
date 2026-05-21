import express from "express";
import {
    createCategory,

} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post("/add", createCategory);
categoryRouter.get("/all", getCategories);
categoryRouter.delete("/delete/:id", deleteCategory);
export default categoryRouter;