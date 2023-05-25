import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { PatchCheck } from "react-bootstrap-icons";
import "react-international-phone/style.css";
import MyButton from "../../Components/Buttons/MyButton";
import "./ShippingInfo.css";

export default function ShippingInfo({ setCurrentStep }) {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const [name, setName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  // const [] = useState("");

  const [shippingInfo, setShippingInfo] = useState();
  const [contactInfo, setContactInfo] = useState();

  useEffect(() => {
    const savedShippingInfo =
      JSON.parse(localStorage.getItem("shippingInfo")) || [];
    const savedContactInfo =
      JSON.parse(localStorage.getItem("contactInfo")) || [];
    setContactInfo(savedContactInfo);
    setShippingInfo(savedShippingInfo);
  }, []);

  useEffect(() => {
    if (contactInfo) {
      setName(contactInfo.name);
      setFamilyName(contactInfo.familyName);
      setEmail(contactInfo.email);
      setNumber(contactInfo.number);
    }

    if (shippingInfo) {
      setAddress(shippingInfo.address);
      setCity(shippingInfo.city);
      setState(shippingInfo.state);
      setCountry(shippingInfo.country);
      setZipCode(shippingInfo.zipCode);
    }
  }, [contactInfo, shippingInfo]);

  const saveInformation = () => {
    // Save shipping info in local storage
    const shippingInfo = {
      address,
      city,
      state,
      country,
      zipCode,
    };
    localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));

    // Save contact info in local storage
    const contactInfo = {
      name,
      familyName,
      email,
      number,
    };
    localStorage.setItem("contactInfo", JSON.stringify(contactInfo));
    setCurrentStep("delivery");
  };

  const [blockNextPage, setBlockNextPage] = useState(true);

  useEffect(() => {
    if (
      name &&
      familyName &&
      email &&
      number &&
      address &&
      city &&
      state &&
      country &&
      zipCode
    ) {
      setBlockNextPage(false);
    } else {
      setBlockNextPage(true);
    }
  }, [name, familyName, email, number, address, city, state, country, zipCode]);

  return (
    <main className="checkout-page container mb-5">
      <div className="steps-cont row">
        <p className="step-name step-name-active col">Versand</p>
        <div className="steps-divider-cont col">
          <div className="steps-divider"></div>
          <div>
            <PatchCheck color={"#b7b7b7"} size={width > 1440 ? 30 : 20} />
          </div>
          <div className="steps-divider"></div>
        </div>
        <p className="step-name step-name-inactive col">Lieferung</p>
        <div className="steps-divider-cont col">
          <div className="steps-divider"></div>
          <div>
            <PatchCheck color={"#b7b7b7"} size={width > 1440 ? 30 : 20} />
          </div>
          <div className="steps-divider"></div>
        </div>
        <p className="step-name step-name-inactive col">Zahlung</p>
      </div>
      <section className="shipping-info row">
        <div className="shipping-info-contact col-lg-5">
          <p className="shipping-info-form-title">Kontaktdetails</p>
          <Form className="shipping-info-form row">
            <Form.Group
              className="mb-3 col-sm-6 col-12"
              controlId="shippingName"
            >
              <Form.Label className="shipping-info-form-label">
                Vorname
              </Form.Label>
              <Form.Control type="text" value={name} readOnly />
            </Form.Group>
            <Form.Group
              className="mb-3 col-sm-6 col-12"
              controlId="shippingFamilyName"
            >
              <Form.Label className="shipping-info-form-label">
                Familienname, Nachname
              </Form.Label>
              <Form.Control type="text" value={familyName} readOnly />
            </Form.Group>

            <Form.Group className="mb-3 col-12" controlId="shippingEmail">
              <Form.Label className="shipping-info-form-label">
                Email
              </Form.Label>
              <Form.Control type="email" value={email} readOnly />
            </Form.Group>
            <Form.Group className="mb-3 col-12" controlId="shippingPhone">
              <Form.Label className="shipping-info-form-label">
                Telefonnummer
              </Form.Label>
              <Form.Control type="text" value={number} readOnly />
            </Form.Group>
          </Form>
        </div>
        <div className="shipping-info-divider col-1">
          <div></div>
        </div>
        <div className="shipping-info-address col-lg-5">
          <p className="shipping-info-form-title">Versanddetails</p>
          <Form className="shipping-info-form row">
            <Form.Group className="mb-3 col-12" controlId="shippingHouse">
              <Form.Label className="shipping-info-form-label">
                Adresse
              </Form.Label>
              <Form.Control
                type="text"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-3 col-sm-6 col-12"
              controlId="shippingAddress"
            >
              <Form.Label className="shipping-info-form-label">
                Stadt
              </Form.Label>
              <Form.Control
                type="text"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-3 col-sm-6 col-12"
              controlId="shippingCity"
            >
              <Form.Label className="shipping-info-form-label">
                Bundesland
              </Form.Label>
              <Form.Control
                type="text"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-3 col-sm-6 col-12"
              controlId="shippingCondition"
            >
              <Form.Label className="shipping-info-form-label">Land</Form.Label>
              <Form.Control
                type="text"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-3 col-sm-6 col-12"
              controlId="shippingZipCode"
            >
              <Form.Label className="shipping-info-form-label">
                Postleitzahl
              </Form.Label>
              <Form.Control
                type="text"
                value={zipCode}
                onChange={(e) => {
                  setZipCode(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </div>
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
        toDo={saveInformation}
        disabled={blockNextPage}
      />
    </main>
  );
}
