import express from "express";
import upload from "../middlewares/multer.js";

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addToWishlist,
  getWishlist,
  deleteFromWishlist,
  updateImage,
} from "../controllers/User.controller.js";
import { ensureUser, ensureAdmin } from "../middlewares/auth.middleware.js";
/** Defining the router */
const usersRouter = express.Router();

usersRouter.route("/getall").get(getUsers);

usersRouter.route("/add").post(createUser);

usersRouter.route("/wishlist").get(ensureUser, getWishlist);

usersRouter.route("/:id").get(getUserById);

usersRouter.route("/:id").put(updateUser).delete(deleteUser);
usersRouter.route("/image/:id").put(upload.single("file"), updateImage);

usersRouter.route("/wishlist/add/:id").post(ensureUser, addToWishlist);

usersRouter
  .route("/wishlist/delete/:id")
  .delete(ensureUser, deleteFromWishlist);

export { usersRouter };
