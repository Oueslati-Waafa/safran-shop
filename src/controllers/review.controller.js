import Review from "../models/Reviews.js";
import Product from "../models/Products.js";
import Reviews from "../models/Reviews.js";

/**CREATE A REVIEW */
export const createReview = async (req, res) => {
  console.log(req);
  try {
    const { rating, description } = req.body;
    const productId = req.params.id;
    const userId = req.user.id; // Retrieve the user ID from the authenticated request

    const review = new Review({
      User: userId,
      Rating: rating,
      Description: description,
    });

    await review.save();

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.reviews.push(review._id);
    product.numOfRatings += 1;
    product.sumOfRatings += rating;
    product.rating = product.sumOfRatings / product.numOfRatings;

    await product.save();

    res.status(201).json({ review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**GET ALL REVIEWS FOR A PRODUCT */
export const getProductReviews = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log(productId);
    const product = await Product.findById(productId).populate("reviews");

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const reviews = product.reviews;

    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**UPDATE MY REVIEW */
export const updateReview = async (req, res) => {
  try {
    const { rating, description } = req.body;
    const reviewId = req.params.id;
    const userId = req.user.id; // Retrieve the user ID from the authenticated request

    const review = await Review.findOneAndUpdate(
      { _id: reviewId, User: userId }, // Only update the review if it belongs to the logged-in user
      { Rating: rating, Description: description },
      { new: true }
    );

    if (!review) {
      return res
        .status(404)
        .json({ error: "Review not found or unauthorized" });
    }

    // Find the associated product
    const product = await Product.findOne({ reviews: review._id });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Calculate the new sumOfRatings for the product
    const reviews = await Review.find({ _id: { $in: product.reviews } });
    const totalRatings = reviews.reduce(
      (sum, review) => sum + review.Rating,
      0
    );

    // Update the sumOfRatings and rating fields in the product
    product.sumOfRatings = totalRatings;
    product.rating = product.sumOfRatings / reviews.length;

    await product.save();

    res.status(200).json({ review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**DELETE A REVIEW */
export const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const userId = req.user.id; // Retrieve the user ID from the authenticated request

    const review = await Review.findOneAndDelete({
      _id: reviewId,
      User: userId, // Only delete the review if it belongs to the logged-in user
    });

    if (!review) {
      return res
        .status(404)
        .json({ error: "Review not found or unauthorized" });
    }

    const product = await Product.findOneAndUpdate(
      { reviews: reviewId },
      { $pull: { reviews: reviewId } }
    );

    if (product) {
      product.numOfRatings -= 1;
      product.sumOfRatings -= review.Rating;
      product.rating =
        product.numOfRatings > 0
          ? product.sumOfRatings / product.numOfRatings
          : 0;
      await product.save();
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
