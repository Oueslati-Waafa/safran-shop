import express from "express";
import { ensureAdmin, ensureUser } from "../middlewares/auth.middleware.js";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  updateProductCountInStock,
  deleteProduct,
} from "../controllers/Product.controller.js";
import {
  createReview,
  deleteReview,
  getProductReviews,
  updateReview,
} from "../controllers/review.controller.js";

/** Defining the router */
const productsRouter = express.Router();

productsRouter.route("/getall").get(getProducts);

productsRouter.route("/add").post(ensureAdmin, createProduct);

productsRouter.route("/:id").get(getProductById);

productsRouter.route("/:id").delete(ensureAdmin, deleteProduct);

productsRouter.route("/:id").put(ensureAdmin, updateProduct);
productsRouter.route("/stock/:id").put(updateProductCountInStock);

productsRouter.route("/:id/reviews").post(ensureUser, createReview);

productsRouter.route("/:id/reviews").get(getProductReviews);

productsRouter.route("/reviews/:id").put(ensureUser, updateReview);

productsRouter.route("/reviews/:reviewId").delete(ensureUser, deleteReview);

export { productsRouter };
