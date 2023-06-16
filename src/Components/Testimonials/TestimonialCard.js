import axios from "axios";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function TestimonialCard({ testimonial }) {
  const [tsUser, setTsUser] = useState();
  useEffect(() => {
    if (testimonial) {
      axios
        .get(`https://safran.onrender.com/users/${testimonial?.userId}`)
        .then((result) => {
          setTsUser(result.data);
        });
    } else {
      return;
    }
  }, [testimonial]);
  return (
    <div className="Testimonial-card row d-flex justify-content-center align-items-center">
      <div className="Testimonial-card-img col-md-4 col-sm col-12 d-flex justify-content-center">
        <div className="userImg-cont">
          <LazyLoadImage
            src={
              tsUser?.imageUrl
                ? tsUser.imageUrl[0]
                : "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684749461/Saafran/logos%20and%20icons/rpsyo19pqbdfnatqgllh.png"
            }
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
        <p className="Testimonial-card-text col-8">{testimonial?.text}</p>
        <div className="col-2 d-flex justify-content-center align-items-end">
          <img
            src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684341804/Saafran/logos%20and%20icons/g5z1rihcol7viaa48o3d.png"
            className="img-fluid text-img"
            alt="icon"
          />
        </div>
      </div>
    </div>
  );
}
