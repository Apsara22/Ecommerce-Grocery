
import Category from "../models/categoryModel.js";

export const createCategory = async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name || !image) {
      return res.json({
        success: false,
        message: "Name and image are required",
      });
    }

    const existing = await Category.findOne({ name });
    if (existing) {
      return res.json({
        success: false,
        message: "Category already exists",
      });
    }

    const category = await Category.create({
      name,
      image,
    });

    res.json({
      success: true,
      message: "Category created",
      category,
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        res.json({
            success: true,
            categories,
        });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        await Category.findByIdAndDelete(id);

        res.json({
            success: true,
            message: "Category deleted",
        });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};