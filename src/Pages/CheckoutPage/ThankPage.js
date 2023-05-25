import React, { useEffect } from "react";
import "./ThankPage.css";

export default function ThankPage() {
  useEffect(() => {
    localStorage.removeItem("cart");
  }, []);

  return (
    <main className="thank-page smoke-gradient d-flex flex-column align-items-center justify-content-center">
      <p className="thank-page-title">
        Vielen Dank, dass Sie sich für unseren Shop entschieden haben
      </p>
      <div className="thank-page-divider"></div>
      <p className="thank-page-subtitle">
        Ihre Bestellung wird in Kürze versendet
      </p>
    </main>
  );
}
