import React from "react";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  return (
    <main className="notFound-page">
      <div className="row d-flex justify-content-center">
        <p className="notFound-oops rounded-pill text-center">OOPS!</p>
        <p className="notFound-notice col-12 text-center">
          Diese Seite wurde nicht gefunden.
        </p>
        <img
          className="img-fluid notFound-img col-md-4 col-8"
          alt="page not found"
          src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1685107912/Saafran/logos%20and%20icons/cw3vfbpukcznwzkejnxn.png"
        />
      </div>
    </main>
  );
}
