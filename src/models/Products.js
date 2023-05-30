import mongoose from "mongoose";
import validator from "validator";


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
      validate: {
        validator: (value) => {
          return validator.isLength(value, { min: 10, max: 250 });
        },
        message: "Description must be between 10 and 250 characters",
      },
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be greater than or equal to 0"],
    },
    weight: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: Array,
      required: true,
      default:
        "https://res.cloudinary.com/dw6pezn3k/image/upload/v1684495286/defaultProduct_nyoogn.jpg",
    },
    countInStock: {
      type: Number,
      required: false,
      min: [0, "Count in stock must be greater than or equal to 0"],
    },

    sumOfRatings: {
      type: Number,
      required: false,
      default: 0,
    },
    numOfRatings: {
      type: Number,
      required: false,
      default: 0,
    },
    rating: {
      type: Number,
      required: false,
      default: 0,
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review", required: false }],
  },
  {
    timestamps: true,
  }
);


const Product = mongoose.model("Product", productSchema);

export default Product;
