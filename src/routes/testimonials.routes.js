import express from "express";
import { ensureUser } from "../middlewares/auth.middleware.js";
import {
  createTestimonial,
  getTestimonialById,
  getTestimonials,
} from "../controllers/testimonials.controller.js";

/** Defining the router */
const testimonialRoutes = express.Router();

testimonialRoutes.route("/getAll").get(getTestimonials);

testimonialRoutes.route("/get/:id").get(getTestimonialById);

testimonialRoutes.route("/add").post(ensureUser, createTestimonial);

export { testimonialRoutes };
