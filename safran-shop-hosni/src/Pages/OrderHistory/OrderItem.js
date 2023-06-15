import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Rating } from "react-simple-star-rating";

export default function OrderItem({ item }) {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  const [orderProduct, setOrderProduct] = useState();
  useEffect(() => {
    if (item) {
      axios
        .get(`http://localhost:9090/products/${item.productId}`)
        .then((result) => {
          setOrderProduct(result.data);
        });
    } else {
      return;
    }
  }, [item]);
  return (
    <div className="cart-item-card col-lg-6 col-11 row mb-3">
      <div className="col-sm-4 col-12 mb-sm-0 mb-3 cart-item-img">
        <LazyLoadImage
          effect="blur"
          src={orderProduct?.imageUrl[0]}
          alt="delete icon"
          className="img-fluid"
        />
      </div>
      <div className="col-sm-8 col-12 cart-item-info">
        <div className="row">
          <div className="col-10">
            <p>
              {orderProduct?.weight} - {orderProduct?.name}
            </p>
            <p>{item?.price * item?.quantity} £</p>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-8 col d-flex justify-content-center">
            <Rating
              initialValue={orderProduct?.rate}
              readonly
              allowFraction
              size={
                width < 576
                  ? 25
                  : width > 576 && width < 768
                  ? 10
                  : width > 768 && width < 992
                  ? 20
                  : 30
              }
            />
          </div>
          <div className="col-sm-4 col card-item-quantity-cont d-flex justify-content-center align-items-center">
            <span className="text-dark text-center">{item?.quantity} </span>
          </div>
        </div>
      </div>
    </div>
  );
}
