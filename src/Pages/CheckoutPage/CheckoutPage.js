import React, { useState } from "react";
import "./CheckoutPage.css";
import OrderSummary from "./OrderSummary";
import ShippingDelivery from "./ShippingDelivery";
import ShippingInfo from "./ShippingInfo";
import ShippingPay from "./ShippingPay";
import ThankPage from "./ThankPage";

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState("info");
  return (
    <main>
      {currentStep === "info" ? (
        <ShippingInfo setCurrentStep={setCurrentStep} />
      ) : currentStep === "delivery" ? (
        <ShippingDelivery setCurrentStep={setCurrentStep} />
      ) : currentStep === "payMeth" ? (
        <ShippingPay setCurrentStep={setCurrentStep} />
      ) : currentStep === "pay" ? (
        <OrderSummary setCurrentStep={setCurrentStep} />
      ) : (
        <ThankPage />
      )}
    </main>
  );
}
