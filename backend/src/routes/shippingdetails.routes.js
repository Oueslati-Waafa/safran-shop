import express from 'express';
/**
 * @swagger
 * tags:
 *   - name: ShippingDetails
 *     description: API endpoints for managing shipping details
 */

import {
    getShippingDetails,
    getShippingDetailsById,
    createShippingDetails,
    updateShippingDetails,
    deleteShippingDetails,
  } from "../controllers/ShipingDetails.controller.js";
  
  /** Defining the router */
  const shippingDetailsRouter = express.Router();
  
  /**
   * @swagger
   * /shipping-details/getall:
   *   get:
   *     summary: Retrieve a list of shipping details
   *     responses:
   *       200:
   *         description: OK
   */
  shippingDetailsRouter.route("/getall").get(getShippingDetails);
  
  /**
   * @swagger
   * /shipping-details/add:
   *   post:
   *     summary: Create new shipping details
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               houseNumber:
   *                 type: string
   *               address:
   *                 type: string
   *               postalCode:
   *                 type: string
   *               landmark:
   *                 type: string
   *     responses:
   *       201:
   *         description: Created
   */
  shippingDetailsRouter.route("/add").post(createShippingDetails);
  
  /**
   * @swagger
   * /shipping-details/{id}:
   *   get:
   *     summary: Retrieve shipping details by ID
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
  shippingDetailsRouter.route("/:id").get(getShippingDetailsById);
  
  /**
   * @swagger
   * /shipping-details/{id}:
   *   put:
   *     summary: Update shipping details
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
   *               houseNumber:
   *                 type: string
   *               address:
   *                 type: string
   *               postalCode:
   *                 type: string
   *               landmark:
   *                 type: string
   *     responses:
   *       200:
   *         description: OK
   *   delete:
   *     summary: Delete shipping details
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
  shippingDetailsRouter.route("/:id").put(updateShippingDetails).delete(deleteShippingDetails);
  
  export { shippingDetailsRouter };
  