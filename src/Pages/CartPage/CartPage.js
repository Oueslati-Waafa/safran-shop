import React, { useEffect, useState } from "react";
import "./CartPage.css";
import { Rating } from "react-simple-star-rating";
import { DashLg, PlusLg } from "react-bootstrap-icons";
import MyButton from "../../Components/Buttons/MyButton";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const handleRemoveFromCart = (productNumber) => {
    const updatedCart = cart.filter(
      (item) => item.product_number !== productNumber
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDecreaseQuantity = (productNumber) => {
    const updatedCart = cart.map((item) => {
      if (item.product_number === productNumber && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleIncreaseQuantity = (productNumber) => {
    const updatedCart = cart.map((item) => {
      if (item.product_number === productNumber) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <main className="cart-page container mb-5">
      <h1 className="text-center fw-bold display-3 my-5">Ihr Warenkorb</h1>
      <div className="cart-items row d-flex justify-content-lg-between justify-content-center">
        {cart ? (
          cart.map((item) => (
            <div className="cart-item-card col-lg-6 col-11 row mb-3">
              <div className="col-sm-4 col-12 mb-sm-0 mb-3 cart-item-img">
                <img
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
                  <div className="col-2 cart-item-delete">
                    <img
                      src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684767941/Saafran/logos%20and%20icons/wih8jbmrrqvxmiszexnw.png"
                      alt="delete icon"
                      className="img-fluid"
                      onClick={() => handleRemoveFromCart(item.product_number)}
                    />
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
                  <div className="col-sm-4 col card-item-quantity-cont d-flex justify-content-between align-items-center">
                    <button
                      className="card-item-quantity-btn btn"
                      onClick={() =>
                        handleDecreaseQuantity(item.product_number)
                      }
                    >
                      <DashLg />
                    </button>
                    <span className="card-item-quantity">{item.quantity} </span>
                    <button
                      className="card-item-quantity-btn btn"
                      onClick={() =>
                        handleIncreaseQuantity(item.product_number)
                      }
                    >
                      <PlusLg />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-dark display-2">No items</p>
        )}
      </div>
      <MyButton
        size={
          width > 992
            ? "smallButton"
            : width < 992 && width > 576
            ? "mediumButton"
            : "largeButton"
        }
        text={cart.length > 0 ? "WEITER ZUR Zahlungsart" : "EINKAUFEN GEHEN"}
        direction={cart.length > 0 ? "/checkout" : "/"}
      />
    </main>
  );
}
