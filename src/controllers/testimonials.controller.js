
import mongoose from "mongoose";
import Testimonial from '../models/Testimonial.js'

/**CREATE A TESTIMONIAL */
// Assuming you have the necessary imports and dependencies

/**CREATE A TESTIMONIAL */
export const createTestimonial = async (req, res) => {
  try {
    // Retrieve the user ID from the token
    const userId = req.user.id;

    const { text } = req.body;

    // Create a new testimonial
    const testimonial = new Testimonial({
      userId, // Use the logged-in user's ID from the token
      text,
    });

    // Save the testimonial to the database
    await testimonial.save();

    res.status(201).json({ testimonial });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/**GET ALL TESTIMONIALS */
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.status(200).json({ testimonials });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**GET TESTIMONIALS BY ID */
export const getTestimonialById = async (req, res) => {
  try {
    const testimonialId = req.params.id;
    const testimonial = await Testimonial.findById(testimonialId);
    if (!testimonial) {
      return res.status(404).json({ error: "Testimonial not found" });
    }
    res.status(200).json({ testimonial });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
