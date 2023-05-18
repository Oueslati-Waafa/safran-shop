import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productNumber: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    weight: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: Array,
      required: true,
    },
    countInStock: { 
      type: Number, 
      required: true 
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
