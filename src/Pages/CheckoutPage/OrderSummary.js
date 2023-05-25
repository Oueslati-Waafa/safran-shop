import React, { useEffect, useState } from "react";
import { PatchCheck } from "react-bootstrap-icons";
import "./OrderSummary.css";
import MyButton from "../../Components/Buttons/MyButton";
import { Link } from "react-router-dom";

export default function OrderSummary({ setCurrentStep }) {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  return (
    <main className="orderPay-page container">
      <div className="steps-cont row">
        <p className="step-name step-name-done col">Versand</p>
        <div className="steps-divider-cont col">
          <div className="steps-divider"></div>
          <div>
            <PatchCheck color={"green"} size={width > 1440 ? 30 : 20} />
          </div>
          <div className="steps-divider"></div>
        </div>
        <p className="step-name step-name-done col">Lieferung</p>
        <div className="steps-divider-cont col">
          <div className="steps-divider"></div>
          <div>
            <PatchCheck color={"green"} size={width > 1440 ? 30 : 20} />
          </div>
          <div className="steps-divider"></div>
        </div>
        <p className="step-name step-name-done col">Zahlung</p>
      </div>
      <section className="orderSummary">
        <div className="orderSummary-items">
          {cart.map((item) => (
            <div className="orderSummary-item">
              <p className="orderSummary-item-details">
                {item.weight} - {item.name} X {item.quantity}
              </p>
              <p className="orderSummary-item-total">
                {item.price * item.quantity}£
              </p>
            </div>
          ))}
        </div>
        <div className="orderSummary-divider"></div>
        <div className="orderSummary-fees">
          <div className="orderSummary-fee">
            <p>MwSt.(7%)</p>
            <p>6,24€</p>
          </div>
          <div className="orderSummary-fee">
            <p>Versandgebühr</p>
            <p>FREI</p>
          </div>
        </div>
        <div className="orderSummary-divider"></div>
        <div className="orderSummary-total">
          <p>Gesamt</p>
          <p>2150€</p>
        </div>
      </section>
      <MyButton
        text="ZAHLEN"
        size={
          width > 992
            ? "smallButton"
            : width < 992 && width > 576
            ? "mediumButton"
            : "largeButton"
        }
        toDo={() => {
          setCurrentStep("thank");
        }}
      />
      <button className="btn-link btn goBack-btn mt-2">
        <Link
          onClick={() => {
            setCurrentStep("payMeth");
          }}
        >
          GEH ZURÜCK
        </Link>
      </button>
    </main>
  );
}
