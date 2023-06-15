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

ordersRouter.route("/my-orders").get(ensureUser, getMyOrders);

ordersRouter.route("/add").post(ensureUser, createOrder);

ordersRouter.route("/getAll").get(ensureAdmin, getAllOrders);

ordersRouter.route("/:orderId").get(ensureUser, getOrderById);

ordersRouter.route("/:id").put(ensureAdmin, updateOrder);

ordersRouter.route("/:id").delete(ensureAdmin, deleteOrder);

ordersRouter.route("/:id/admin-cancel").put(ensureAdmin, cancelOrderAdmin);

ordersRouter.route("/stripe-payment").post(ensureUser, payOrder);
ordersRouter
  .route("/create-paypal-payment")
  .post(ensureUser, createPaypalPayment);

export { ordersRouter };
