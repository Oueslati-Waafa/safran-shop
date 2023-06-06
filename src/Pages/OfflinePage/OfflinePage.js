import React from "react";
import "./OfflinePage.css";

export default function OfflinePage() {
  return (
    <main className="notFound-page">
      <div className="row d-flex justify-content-center">
        <p className="notFound-oops rounded-pill text-center">OOPS!</p>
        <p className="notFound-notice col-12 text-center">
          Es scheint, als ob Sie offline sind.
        </p>
        <img
          className="img-fluid notFound-img col-md-4 col-8"
          alt="page not found"
          src="/offline.png"
        />
      </div>
    </main>
  );
}
