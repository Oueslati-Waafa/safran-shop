import React, { useEffect, useState } from "react";
import "./CartPage.css";
import { Rating } from "react-simple-star-rating";
import { DashLg, PlusLg } from "react-bootstrap-icons";
import MyButton from "../../Components/Buttons/MyButton";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
      (item) => item.productNumber !== productNumber
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDecreaseQuantity = (productNumber) => {
    const updatedCart = cart.map((item) => {
      if (item.productNumber === productNumber && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleIncreaseQuantity = (productNumber) => {
    const updatedCart = cart.map((item) => {
      if (item.productNumber === productNumber) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const [savedUser, setSavedUser] = useState();
  const [loggedIn, setLoggedin] = useState(false);
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    setSavedUser(JSON.parse(localStorage.getItem("user")) || []);
    setLoggedin(JSON.parse(localStorage.getItem("loggedIn")) || false);
  }, []);

  return (
    <main className="cart-page container mb-5">
      <h1 className="text-center fw-bold display-3 my-5">Ihr Warenkorb</h1>
      <div className="cart-items row d-flex justify-content-lg-between justify-content-center">
        {cart ? (
          cart.map((item, index) => (
            <div
              className="cart-item-card col-lg-6 col-11 row mb-3"
              key={index}
            >
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
                  <div className="col-2 cart-item-delete">
                    <LazyLoadImage
                      effect="blur"
                      src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684767941/Saafran/logos%20and%20icons/wih8jbmrrqvxmiszexnw.png"
                      alt="delete icon"
                      className="img-fluid"
                      onClick={() => handleRemoveFromCart(item.productNumber)}
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
                      onClick={() => handleDecreaseQuantity(item.productNumber)}
                    >
                      <DashLg />
                    </button>
                    <span className="card-item-quantity">{item.quantity} </span>
                    <button
                      className="card-item-quantity-btn btn"
                      onClick={() => handleIncreaseQuantity(item.productNumber)}
                      disabled={item.quantity === item.countInStock}
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
        disabled={savedUser !== [] && loggedIn !== false ? false : true}
      />
      {savedUser !== [] && loggedIn !== false ? null : (
        <p className="text-dark text-muted text-center">
          Bitte loggen Sie sich zuerst ein!
        </p>
      )}
    </main>
  );
}
