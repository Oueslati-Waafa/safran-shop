import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Title from "../../Components/Title/Title";
import { Rating } from "react-simple-star-rating";
import "./OrderHistory.css";

export default function OrderHistory() {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);
  const orders = [
    {
      orderItems: cart,
      createdAt: "25/05/2023",
    },
    {
      orderItems: cart,
      createdAt: "22/05/2023",
    },
  ];

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  return (
    <main className="orders-cont container">
      <h1 className="text-center fw-bold display-3 my-5">Kaufhistorie</h1>
      {orders.map((order, index) => (
        <div className="order-cont" key={index}>
          <Title content={order.createdAt} />
          <div className="cart-items row d-flex justify-content-lg-between justify-content-center">
            {order.orderItems.map((item, index) => (
              <div className="cart-item-card col-lg-6 col-11 row mb-3" key={index}>
                <div className="col-sm-4 col-12 mb-sm-0 mb-3 cart-item-img">
                  <LazyLoadImage
                    effect="blur"
                    src={item.imageUrl[0]}
                    alt="delete icon"
                    className="img-fluid"
                  />
                </div>
                <div className="col-sm-8 col-12 cart-item-info">
                  <div className="row">
                    <div className="col-10">
                      <p>
                        {item.weight} - {item.name}
                      </p>
                      <p>{item.price * item.quantity}£</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-8 col d-flex justify-content-center">
                      <Rating
                        initialValue={item.rate}
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
                      <span className="text-dark text-center">
                        {item.quantity}{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
