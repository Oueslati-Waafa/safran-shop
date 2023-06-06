import express from "express";
import { ensureAdmin, ensureUser } from "../middlewares/auth.middleware.js";

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: API endpoints for managing products
 */

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
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

/**
 * @swagger
 * /products/getall:
 *   get:
 *     summary: Retrieve a list of products
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: OK
 */
productsRouter.route("/getall").get(getProducts);

/**
 * @swagger
 * /products/add:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productNumber:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               weight:
 *                 type: number
 *               countInStock:
 *                 type: number
 *     responses:
 *       201:
 *         description: Created
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

productsRouter.route("/add").post(ensureAdmin, createProduct);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retrieve a product by ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
productsRouter.route("/:id").get(getProductById);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *     securitySchemes:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 */
productsRouter.route("/:id").delete(ensureAdmin, deleteProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productNumber:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               weight:
 *                 type: number
 *               countInStock:
 *                 type: number
 *     responses:
 *       200:
 *         description: OK
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
productsRouter.route("/:id").put(ensureAdmin, updateProduct);

/**
 * @swagger
 * /products/{id}/reviews:
 *   post:
 *     summary: Create a new review for a product
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 review:
 *                   $ref: '#/components/schemas/Review'
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
productsRouter.route("/:id/reviews").post(ensureUser, createReview);

/**
 * @swagger
 * /products/{id}/reviews:
 *   get:
 *     summary: Get all reviews for a product
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */

productsRouter.route("/:id/reviews").get(getProductReviews);

/**
 * @swagger
 * /products/reviews/{id}:
 *   put:
 *     summary: Update a review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Review not found
 *       500:
 *         description: Internal Server Error
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
productsRouter.route("/reviews/:id").put(ensureUser, updateReview);

/**
 * @swagger
 * /products/reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

productsRouter.route("/reviews/:reviewId").delete(ensureUser, deleteReview);

export { productsRouter };
