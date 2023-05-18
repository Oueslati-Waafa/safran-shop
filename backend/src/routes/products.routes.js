import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/Product.controller.js";
import express from 'express';

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API endpoints for managing products
 * /products/getall:
 *   get:
 *     summary: Retrieve a list of products
 *     responses:
 *       200:
 *         description: OK
 * /products/add:
 *   post:
 *     summary: Create a new product
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
 * /products/{id}:
 *   get:
 *     summary: Retrieve a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *   put:
 *     summary: Update a product
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
 *   delete:
 *     summary: Delete a product
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

// routes handlers

/** Defining the router */
const productsRouter = express.Router();

productsRouter.route("/add").post(createProduct);
productsRouter.route("/getall").get(getProducts);

productsRouter
  .route("/:id")
  .delete(deleteProduct)
  .get(getProductById)
  .put(updateProduct);

export { productsRouter };
