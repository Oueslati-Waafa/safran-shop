/**
 * @swagger
 * tags:
 *   - name: Orders
 *     description: API endpoints for managing orders
 */
import { ensureAdmin, ensureUser } from "../middlewares/auth.middleware.js";

import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getMyOrders,
  cancelOrderAdmin,
  payOrder,
  createPaypalPayment,
} from "../controllers/Order.controller.js";

/** Defining the router */
const ordersRouter = express.Router();

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
ordersRouter.route("/my-orders").get(ensureUser, getMyOrders);

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
 *       200:
 *         description: Order Placed Successfully
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
 *               pName:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: number
 *               productId:
 *                 type: string
 *           required:
 *             - pName
 *             - price
 *             - quantity
 *             - productId
 *         totalPrice:
 *           type: number
 *         orderStatus:
 *           type: string
 *           enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled']
 *         shippingPrice:
 *           type: number
 *         taxPrice:
 *           type: number
 *         paymentMethod:
 *           type: string
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
ordersRouter.route("/getAll").get(ensureAdmin, getAllOrders);

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
ordersRouter.route("/:orderId").get(ensureUser, getOrderById);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update an order
 *     tags:
 *       - Orders
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
 *             $ref: '#/components/schemas/OrderUpdateInput'
 *     responses:
 *       200:
 *         description: OK
 *     securitySchemes:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 * components:
 *   schemas:
 *     OrderUpdateInput:
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
 *         orderItems:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItemUpdateInput'
 *         paymentInfo:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             status:
 *               type: string
 *         totalPrice:
 *           type: number
 *         orderStatus:
 *           type: string
 *           enum:
 *             - Processing
 *             - Shipped
 *             - Delivered
 *             - Cancelled
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
 *     OrderItemUpdateInput:
 *       type: object
 *       properties:
 *         pName:
 *           type: string
 *         price:
 *           type: number
 *         quantity:
 *           type: number
 *         productId:
 *           type: string
 */
ordersRouter.route("/:id").put(ensureAdmin, updateOrder);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order
 *     tags:
 *       - Orders
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
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal Server Error
 *     operationId: deleteOrder
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
ordersRouter.route("/:id").delete(ensureAdmin, deleteOrder);

/**
 * @swagger
 * /orders/{id}/admin-cancel:
 *   put:
 *     summary: Cancel an order
 *     tags:
 *       - Orders
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
 *       400:
 *         description: Order cannot be canceled
 *       404:
 *         description: Order not found
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
ordersRouter.route("/:id/admin-cancel").put(ensureAdmin, cancelOrderAdmin);

ordersRouter.route("/stripe-payment").post(ensureUser, payOrder);
ordersRouter.route("/create-paypal-payment").post(ensureUser,createPaypalPayment);

export { ordersRouter };
