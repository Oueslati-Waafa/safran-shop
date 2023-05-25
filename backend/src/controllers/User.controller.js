import User from "../models/Users.js";
import Product from "../models/Products.js";
import mongoose from "mongoose";
import { validationResult } from "express-validator";
// GET /users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("shippingDetails");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// GET /users/:id
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate("shippingDetails");

    if (!user) {
      console.log(`User not found for ID: ${userId}`);
      return res.status(404).json({ error: "User not found" });
    }

    console.log(`Found user: ${user}`);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**CREATE A NEW USER */
const createUser = async (req, res) => {
  try {
    const {
      fname,
      lname,
      email,
      phoneNumber,
      password,
      isAdmin,
      shippingDetails,
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const user = await User.create({
      fname,
      lname,
      email,
      phoneNumber,
      password,
      isAdmin,
    });

    res.status(201).json(user);
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({ error: validationErrors });
    }

    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// PUT /users/:id
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE /users/:id
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**ADD A PRODUCT TO WISHLIST */
export const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id; // Retrieve the user ID from the authenticated request
    const productId = req.params.id; // Retrieve the product ID from the request parameters

    console.log(productId)
    const user = await User.findById(userId); // Find the user by ID
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the product already exists in the wishlist
    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    const isValidObjectId = mongoose.Types.ObjectId.isValid(productId);
    if (!isValidObjectId) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const product = await Product.findById(productId); // Find the product by ID
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Add the product ID to the user's wishlist
    user.wishlist.push(productId); // Push the productId instead of the product object
    await user.save();

    res.status(200).json({ message: "Product added to wishlist successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**DELETE A PRODUCT FROM A WISHLIST */
export const deleteFromWishlist = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
      res.status(400).json({ error: validationResult(req).array() });
    } else {
      const productId = req.params.id;
      const userId = req.user.id;
      User
        .findByIdAndUpdate(userId, { $pull: { wishlist: productId } })
        .then(() => {
          res
            .status(200)
            .json({ message: "Product removed from wishlist successfully!" });
        })
        .catch((err) => res.status(500).json({ error: err.message }));
    }
};

/**GET THE USERS WISHLIST */
export const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id; // Retrieve the user ID from the authenticated request
    console.log("User ID:", userId); // Log the user ID

    const user = await User.findById(userId).populate("wishlist"); // Find the user by ID and populate the wishlist

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const wishlist = user.wishlist; // Access the populated wishlist from the user object

    res.status(200).json({ wishlist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export { getUsers, getUserById, createUser, updateUser, deleteUser };
