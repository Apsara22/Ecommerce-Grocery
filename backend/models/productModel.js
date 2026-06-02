import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },

    productName: {
      type: String,
      required: true,
      trim: true,
    },

    desc: {
      type: String,
      required: true,
    },

    productPrice: {
      type: Number,
      required: true,
    },

    productOffer: {
      type: Number,
      default: 0,
    },
    finalPrice: {
  type: Number,
},

    // CATEGORY ADDED
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;