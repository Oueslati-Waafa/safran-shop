import express from "express";
import { ensureLoggedIn, ensureAdmin } from "../middlewares/auth.middleware.js";

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

export { productsRouter };
