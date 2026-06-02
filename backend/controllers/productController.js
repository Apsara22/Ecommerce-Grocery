import Product from "../models/productModel.js";

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const {
      image,
      productName,
      desc,
      productPrice,
      productOffer,
      category,
    } = req.body;

    // validation
    if (
      !image ||
      !productName ||
      !desc ||
      !productPrice ||
      !category
    ) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ calculate final price after discount
    const discount = productOffer || 0;

    const finalPrice =
      productPrice - (productPrice * discount) / 100;

    // create product
    const product = await Product.create({
      image,
      productName,
      desc,
      productPrice,
      productOffer,
      category,

      // ✅ optional field (store final price)
      finalPrice,
    });

    res.json({
      success: true,
      message: "Product created successfully",
      product,
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {

    const products = await Product.find()
      .populate("category", "name");

    res.json({
      success: true,
      products,
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      image,
      productName,
      desc,
      productPrice,
      productOffer,
      category,
    } = req.body;

    // validation
    if (!productName || !desc || !productPrice || !category) {
      return res.json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // calculate final price
    const discount = productOffer || 0;

    const finalPrice =
      productPrice - (productPrice * discount) / 100;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        image,
        productName,
        desc,
        productPrice,
        productOffer,
        category,
        finalPrice,
      },
      { new: true }
    ).populate("category", "name");

    res.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await Product.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};