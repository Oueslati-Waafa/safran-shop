import React, { useEffect, useState } from "react";
import "./Testimonials.css";
import { Carousel } from "react-bootstrap";
import "react-lazy-load-image-component/src/effects/blur.css";
import TestimonialCard from "./TestimonialCard";
import axios from "axios";

export default function Testimonials(props) {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    axios.get("https://safran.onrender.com/testimonials/getAll").then((result) => {
      setTestimonials(result.data.testimonials);
    });
  }, []);

  const getRandomTestimonials = (count) => {
    const shuffled = testimonials.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomTestimonials = getRandomTestimonials(5);

  return (
    <div className="Testimonials-cont">
      <Carousel fade controls={false}>
        {randomTestimonials &&
          randomTestimonials.map((testimonial, index) => (
            <Carousel.Item
              className="p-5 d-flex justify-content-center align-items-center"
              key={index}
            >
              <TestimonialCard testimonial={testimonial} />
            </Carousel.Item>
          ))}
      </Carousel>
    </div>
  );
}
