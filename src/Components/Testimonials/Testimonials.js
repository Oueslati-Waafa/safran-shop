import React from "react";
import "./Testimonials.css";

export default function Testimonials(props) {
  return (
    <div className="Testimonials-cont">
      {props.testimonials.map((testimonial) => (
        <div className="Testimonial-card">
          <div className="Testimonial-card-img">
            <img src={testimonial.userImg} className="img-fluid" />
          </div>
          <div className="Testimonial-card-text"></div>
        </div>
      ))}
    </div>
  );
}
