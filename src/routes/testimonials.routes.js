/**
 * @swagger
 * tags:
 *   - name: Testimonials
 *     description: API endpoints for managing testimonials
 */

import express from "express";
import  {ensureUser}  from "../middlewares/auth.middleware.js";
import { createTestimonial, getTestimonialById, getTestimonials } from "../controllers/testimonials.controller.js";

/** Defining the router */
const testimonialRoutes = express.Router()


/**
 * @swagger
 * /testimonials/getAll:
 *   get:
 *     summary: Get all testimonials
 *     tags: [Testimonials]
 *     responses:
 *       200:
 *         description: A list of testimonials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 testimonials:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Testimonial'
 */
testimonialRoutes.route("/getAll").get(getTestimonials);

/**
 * @swagger
 * /testimonials/get/{id}:
 *   get:
 *     summary: Get a testimonial by ID
 *     tags: [Testimonials]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the testimonial
 *     responses:
 *       200:
 *         description: The testimonial with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Testimonial'
 *       404:
 *         description: Testimonial not found
 */
testimonialRoutes.route("/get/:id").get(getTestimonialById);



/**
 * @swagger
 * /testimonials/add:
 *   post:
 *     summary: Create a testimonial
 *     tags: [Testimonials]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The text content of the testimonial
 *             example:
 *               text: "I highly recommend this product!"
 *     responses:
 *       201:
 *         description: Testimonial created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Testimonial'
 *       401:
 *         description: Unauthorized - User not logged in
 *       500:
 *         description: Internal Server Error
 */
testimonialRoutes.route("/add").post(ensureUser, createTestimonial);

export {testimonialRoutes}