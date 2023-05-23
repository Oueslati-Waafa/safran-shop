/**
 * @swagger
 * tags:
 *   - name: Orders
 *     description: API endpoints for managing orders
 */
import {
  ensureAdmin,
  ensureUser,
} from "../middlewares/auth.middleware.js";

import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getMyOrders
} from "../controllers/Order.controller.js";

/** Defining the router */
const ordersRouter = express.Router();

/**
 * @swagger
 * /orders/add:
 *   post:
 *     summary: Create a new order
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderRequest'
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       400:
 *         description: Invalid request or missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *
 * components:
 *   schemas:
 *     OrderRequest:
 *       type: object
 *       properties:
 *         shippingInfo:
 *           type: object
 *           properties:
 *             address:
 *               type: string
 *             city:
 *               type: string
 *             state:
 *               type: string
 *             country:
 *               type: string
 *             postalCode:
 *               type: number
 *           required:
 *             - address
 *             - city
 *             - state
 *             - country
 *             - postalCode
 *         orderItems:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: number
 *               product:
 *                 type: string
 *           required:
 *             - name
 *             - price
 *             - quantity
 *             - product
 *         user:
 *           type: string
 *         paymentInfo:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             status:
 *               type: string
 *         paidAt:
 *           type: string
 *           format: date-time
 *         totalPrice:
 *           type: number
 *         orderStatus:
 *           type: string
 *           enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled']
 *         isPaid:
 *           type: boolean
 *         shippingPrice:
 *           type: number
 *         taxPrice:
 *           type: number
 *         deliveredAt:
 *           type: string
 *           format: date-time
 *         shippedAt:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *     OrderResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         order:
 *           $ref: '#/components/schemas/Order'
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         shippingInfo:
 *           type: object
 *           properties:
 *             address:
 *               type: string
 *             city:
 *               type: string
 *             state:
 *               type: string
 *             country:
 *               type: string
 *             postalCode:
 *               type: number
 *         orderItems:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: number
 *               product:
 *                 type: string
 *           required:
 *             - name
 *             - price
 *             - quantity
 *             - product
 *         user:
 *           type: string
 *         paymentInfo:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             status:
 *               type: string
 *         paidAt:
 *           type: string
 *           format: date-time
 *         totalPrice:
 *           type: number
 *         orderStatus:
 *           type: string
 *           enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled']
 *         isPaid:
 *           type: boolean
 *         shippingPrice:
 *           type: number
 *         taxPrice:
 *           type: number
 *         deliveredAt:
 *           type: string
 *           format: date-time
 *         shippedAt:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 */

ordersRouter.route("/add").post(ensureUser, createOrder);

/**
 * @swagger
 * /orders/getAll:
 *   get:
 *     summary: Get all orders
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
ordersRouter.route(ensureAdmin, "/getAll").get(getAllOrders);

/**
 * @swagger
 * /orders/{orderId}:
 *   get:
 *     summary: Get a single order by ID
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
ordersRouter.route(ensureAdmin, "/:orderId").get(getOrderById);

/**
 * @swagger
 * /orders/{orderId}:
 *   put:
 *     summary: Update an order
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrderInput'
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Invalid request or missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   delete:
 *     summary: Delete an order
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
ordersRouter
  .route(ensureAdmin, "/:orderId")
  .put(updateOrder)
  .delete(deleteOrder);

  /**
 * @swagger
 * /orders/my-orders:
 *   get:
 *     summary: Get all orders for the connected user
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 orders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *     securitySchemes:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 */
ordersRouter.route('/orders/my-orders').get(ensureUser, getMyOrders);


export { ordersRouter };
