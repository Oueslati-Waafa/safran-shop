import React, { useEffect, useState } from "react";
import "./ShippingPay.css";
import { PatchCheck } from "react-bootstrap-icons";
import MyButton from "../../Components/Buttons/MyButton";
import { Link } from "react-router-dom";

export default function ShippingPay({ setCurrentStep }) {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  const [selectedPayMeth, setSelectedPayMeth] = useState("none");

  const savePayMeth = () => {
    const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo")) || {};
    const updatedShippingInfo = {
      ...shippingInfo,
      payMeth: selectedPayMeth,
    };
    localStorage.setItem("shippingInfo", JSON.stringify(updatedShippingInfo));
    setCurrentStep("pay");
  };

  useEffect(() => {
    // Load the selected shipping fee from local storage
    const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo")) || [];
    if (shippingInfo !== []) {
      setSelectedPayMeth(shippingInfo.payMeth);
      console.log(shippingInfo.payMeth);
    }
  }, []);

  return (
    <main className="pay-page container">
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
        <p className="step-name step-name-active col">Zahlung</p>
      </div>
      <section className="pay-page container mb-5">
        <div className="pay-meths-cont row">
          <div
            className={`pay-meth col-lg-2 col-sm-3 col-10 ${
              selectedPayMeth === "payPal" ? "pay-meth-selected" : ""
            }`}
            onClick={() => {
              setSelectedPayMeth("payPal");
            }}
          >
            <img
              src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684856152/Saafran/logos%20and%20icons/qbo4wiibjaje8e57ziqv.png"
              alt="border icon"
              className={`border-icon img-fluid ${
                selectedPayMeth === "payPal" ? "" : "d-none"
              }`}
            />
            <img
              className="img-fluid pay-meth-icon"
              alt="payment method icon"
              src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684922713/Saafran/logos%20and%20icons/ekyeumi0y6ou1dpynh5u.png"
            />
          </div>
          <div
            className={`pay-meth col-lg-2 col-sm-3 col-10 ${
              selectedPayMeth === "visaCard" ? "pay-meth-selected" : ""
            }`}
            onClick={() => {
              setSelectedPayMeth("visaCard");
            }}
          >
            <img
              src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684856152/Saafran/logos%20and%20icons/qbo4wiibjaje8e57ziqv.png"
              alt="border icon"
              className={`border-icon img-fluid ${
                selectedPayMeth === "visaCard" ? "" : "d-none"
              }`}
            />
            <img
              className="img-fluid pay-meth-icon"
              alt="payment method icon"
              src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684922713/Saafran/logos%20and%20icons/egoyhjeohlmwlscjmdp9.png"
            />
          </div>
          <div
            className={`pay-meth col-lg-2 col-sm-3 col-10 ${
              selectedPayMeth === "masterCard" ? "pay-meth-selected" : ""
            }`}
            onClick={() => {
              setSelectedPayMeth("masterCard");
            }}
          >
            <img
              src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684856152/Saafran/logos%20and%20icons/qbo4wiibjaje8e57ziqv.png"
              alt="border icon"
              className={`border-icon img-fluid ${
                selectedPayMeth === "masterCard" ? "" : "d-none"
              }`}
            />
            <img
              className="img-fluid pay-meth-icon"
              alt="payment method icon"
              src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684922712/Saafran/logos%20and%20icons/inqqdvsyxnn4snnqeg9a.png"
            />
          </div>
        </div>
      </section>
      <MyButton
        text="Kauf abschließen"
        size={
          width > 992
            ? "smallButton"
            : width < 992 && width > 576
            ? "mediumButton"
            : "largeButton"
        }
        disabled={selectedPayMeth === "none" || selectedPayMeth === undefined}
        toDo={savePayMeth}
      />
      <button className="btn-link btn goBack-btn mt-2">
        <Link
          onClick={() => {
            setCurrentStep("delivery");
          }}
        >
          GEH ZURÜCK
        </Link>
      </button>
    </main>
  );
}
