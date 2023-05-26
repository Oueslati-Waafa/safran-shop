import express from "express";
import {
  createReview,
  deleteReview,
  getProductReviews,
  getReviewById,
  updateReview,
} from "../controllers/review.controller";
import { ensureUser } from "../middlewares/auth.middleware";


/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: API for managing product reviews
 */







/**
 * @swagger
 * /reviews/{reviewId}:
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the review
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Review not found
 *       500:
 *         description: Internal Server Error
 */

reviewsRouter.route("/reviews/:reviewId").delete(ensureUser, deleteReview);
