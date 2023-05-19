import React, { useEffect, useState } from "react";
import Title from "../../Components/Title/Title";
import "./Contact.css";
import { Link } from "react-router-dom";
import ContinueShopping from "../../Components/Buttons/ContinueShopping";

export default function Contact() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  return (
    <main className="contact-page container">
      <h1 className="text-center my-5 fw-bold display-5">Kontakt</h1>
      <Title content={"Kundendienst"} />
      <section className="customer-service">
        <div className="row mb-5 customer-service-calling">
          <div className="col-md-1 col-sm-2 col-3">
            <img
              src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684510670/Saafran/logos%20and%20icons/gmu1cgpjtbbhd15m9gee.png"
              alt="service icon"
              className="img-fluid customer-service-img"
            />
          </div>
          <div className="col-md-11 col-sm-10 col-9">
            <p className="customer-service-numbers">
              <span className="customer-service-number">+1-800-123-4567</span>
              {width > 768 ? (
                <span className="customer-service-address">/</span>
              ) : null}
              <span className="customer-service-number">+1-888-987-6543</span>
              {width > 768 ? (
                <span className="customer-service-address">/</span>
              ) : null}
              <span className="customer-service-number">+1-877-543-2109</span>
            </p>
          </div>
        </div>
        <div className="row mb-5 customer-service-location">
          <div className="col-md-1 col-sm-2 col-3">
            <img
              src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684510681/Saafran/logos%20and%20icons/bzcf4naohc84yq3yg1pu.png"
              alt="service icon"
              className="img-fluid customer-service-img"
            />
          </div>
          <div className="col-md-11 col-sm-10 col-9">
            <p className="customer-service-addresses">
              <span className="customer-service-address">
                456 Elm Street Cityville, State 98765, Germany
              </span>
              {width > 768 ? (
                <span className="customer-service-address">/</span>
              ) : null}
              <span className="customer-service-address">
                789 Oak Avenue Townsville, Province 54321 Germany
              </span>
            </p>
          </div>
        </div>
        <div className="row customer-service-mailing">
          <div className="col-md-1 col-sm-2 col-3">
            <img
              src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684510691/Saafran/logos%20and%20icons/okp9avgrbb4tusegapw9.png"
              alt="service icon"
              className="img-fluid customer-service-img"
            />
          </div>
          <div className="col-md-11 col-sm-10 col-9">
            <p className="customer-service-emails">
              <span className="customer-service-email">
                customer.support@example.com
              </span>
              {width > 768 ? (
                <span className="customer-service-address">/</span>
              ) : null}
              <span className="customer-service-email">
                customer.support@example.com
              </span>
              {width > 768 ? (
                <span className="customer-service-address">/</span>
              ) : null}
              <span className="customer-service-email">
                supportteam@companyname.com
              </span>
            </p>
          </div>
        </div>
      </section>
      <Title content={"SOZIALEN MEDIEN"} />
      <section className="social-media">
        <div className="row d-flex justify-content-evenly">
          <div className="col-sm col-3 d-flex justify-content-center">
            <Link to={"https://www.instagram.com"}>
              <img
                src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684511784/Saafran/logos%20and%20icons/b5calkncgd0erhrizgch.png"
                alt="social media icon"
                className="img-fluid social-media-icon"
              />
            </Link>
          </div>
          <div className="col-sm col-3 d-flex justify-content-center">
            <Link to={"https://www.linkedin.com"}>
              <img
                src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684511835/Saafran/logos%20and%20icons/xnn6czxerzoxz7pfskpl.png"
                alt="social media icon"
                className="img-fluid social-media-icon"
              />
            </Link>
          </div>
          <div className="col-sm col-3 d-flex justify-content-center">
            <Link to={"https://www.facebook.com"}>
              <img
                src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684511852/Saafran/logos%20and%20icons/igwbicaid5iimslnopkb.png"
                alt="social media icon"
                className="img-fluid social-media-icon"
              />
            </Link>
          </div>
        </div>
      </section>
      <p className="contact-text">
        Unsere Geschäftszeiten sind [Geschäftszeiten] und wir antworten
        normalerweise auf E-Mails und Telefonanrufe innerhalb von
        [Reaktionszeit]. Wenn Sie uns außerhalb unserer Geschäftszeiten
        kontaktieren, werden wir uns so schnell wie möglich bei Ihnen melden.
      </p>
      <ContinueShopping
        size={
          width > 992
            ? "smallButton"
            : width < 992 && width > 576
            ? "mediumButton"
            : "largeButton"
        }
      />
    </main>
  );
}
