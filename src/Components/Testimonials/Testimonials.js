import React from "react";
import "./Testimonials.css";
import { Carousel } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function Testimonials(props) {
  return (
    <div className="Testimonials-cont">
      <Carousel fade controls={false}>
        {props.testimonials.map((testimonial, index) => (
          <Carousel.Item
            className="p-5 d-flex justify-content-center align-items-center"
            key={index}
          >
            <div className="Testimonial-card row d-flex justify-content-center align-items-center">
              <div className="Testimonial-card-img col-md-4 col-sm col-12 d-flex justify-content-center">
                <div className="userImg-cont">
                  <LazyLoadImage
                    src={testimonial.userImg}
                    className="userImg img-fluid"
                    effect="blur"
                  />
                </div>
              </div>
              <div className="Testimonial-card-text-cont col-md-8 col-sm col-12 d-flex flex-nowrap row">
                <div className="col-2 d-flex justify-content-center align-items-start">
                  <img
                    src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684341781/Saafran/logos%20and%20icons/q2u8orqmiune6g6gvwms.png"
                    className="img-fluid text-img"
                    alt="icon"
                  />
                </div>
                <p className="Testimonial-card-text col-8">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Aperiam, quidem nihil maiores dolore rem libero ducimus
                    sint, eveniet inventore cumque dolorem nulla in
                    necessitatibus eius itaque aspernatur? Aliquid distinctio
                    sequi quasi, voluptates eaque est officia. Omnis cupiditate,
                    sed ex odio ab quam non nemo, cumque sunt delectus harum,
                    eum sit?
                </p>
                <div className="col-2 d-flex justify-content-center align-items-end">
                  <img
                    src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684341804/Saafran/logos%20and%20icons/g5z1rihcol7viaa48o3d.png"
                    className="img-fluid text-img"
                    alt="icon"
                  />
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
