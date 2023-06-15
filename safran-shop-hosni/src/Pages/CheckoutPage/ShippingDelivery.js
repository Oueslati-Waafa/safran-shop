import React, { useEffect, useState } from "react";
import "./ShippingDelivery.css";
import { PatchCheck } from "react-bootstrap-icons";
import MyButton from "../../Components/Buttons/MyButton";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

export default function ShippingDelivery({ setCurrentStep }) {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const [shippingFee, setShippingFee] = useState(0); // State to store the shipping fee

  const saveShippingFee = () => {
    const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo")) || {};
    const updatedShippingInfo = {
      ...shippingInfo,
      shippingFee: shippingFee,
    };
    localStorage.setItem("shippingInfo", JSON.stringify(updatedShippingInfo));
    setCurrentStep("payMeth");
  };

  useEffect(() => {
    // Load the selected shipping fee from local storage
    const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo")) || [];
    if (shippingInfo !== []) {
      setShippingFee(shippingInfo.shippingFee);
    }
  }, []);

  return (
    <main className="delivery-page container">
      <div className="steps-cont row">
        <p className="step-name step-name-done col">Versand</p>
        <div className="steps-divider-cont col">
          <div className="steps-divider"></div>
          <div>
            <PatchCheck color={"green"} size={width > 1440 ? 30 : 20} />
          </div>
          <div className="steps-divider"></div>
        </div>
        <p className="step-name step-name-active col">Lieferung</p>
        <div className="steps-divider-cont col">
          <div className="steps-divider"></div>
          <div>
            <PatchCheck color={"#b7b7b7"} size={width > 1440 ? 30 : 20} />
          </div>
          <div className="steps-divider"></div>
        </div>
        <p className="step-name step-name-inactive col">Zahlung</p>
      </div>
      <section className="shipping-delivery">
        <Form className="shipping-delivery-form">
          <Form.Label className="shipping-delivery-title mb-3">
            Lieferoptionen
          </Form.Label>
          <Form.Group className="shipping-delivery-form-group mb-5">
            <Form.Check
              type={"radio"}
              label={"Standardmäßig 5-7 Werktage"}
              id={"maxWeek"}
              name="delivery-option"
              value={0}
              checked={shippingFee === 0}
              onChange={() => setShippingFee(0)}
            />
            <p>FREI</p>
          </Form.Group>
          <Form.Group className="shipping-delivery-form-group mb-5">
            <Form.Check
              type={"radio"}
              label={"2-4 Werktage"}
              id={"maxFourDays"}
              name="delivery-option"
              value={10}
              checked={shippingFee === 10}
              onChange={() => setShippingFee(10)}
            />
            <p>+10€</p>
          </Form.Group>
          <Form.Group className="shipping-delivery-form-group">
            <Form.Check
              type={"radio"}
              label={"Lieferung am selben Tag"}
              id={"instantDelivery"}
              name="delivery-option"
              value={25}
              checked={shippingFee === 25}
              onChange={() => setShippingFee(25)}
            />
            <p>+25€</p>
          </Form.Group>
        </Form>
      </section>
      <MyButton
        text="WEITERMACHEN"
        size={
          width > 992
            ? "smallButton"
            : width < 992 && width > 576
            ? "mediumButton"
            : "largeButton"
        }
        toDo={saveShippingFee}
        disabled={shippingFee === undefined || shippingFee === null}
      />
      <button className="btn-link btn goBack-btn mt-2">
        <Link
          onClick={() => {
            setCurrentStep("info");
          }}
        >
          GEH ZURÜCK
        </Link>
      </button>
    </main>
  );
}
