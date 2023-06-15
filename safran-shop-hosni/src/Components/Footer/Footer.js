import React, { useEffect, useState } from "react";
import "./Footer.css";
import { Form, Modal } from "react-bootstrap";
import axios from "axios";

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputFocus = () => {
    setIsModalOpen(true);
  };

  const handleModalOk = () => {
    setIsModalOpen(false);
    console.log("Input value:", inputValue);
  };

  const [user, setUser] = useState();
  const [userToken, setUserToken] = useState();
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user")) || [];
    setUser(savedUser);
    setUserToken(savedUser.token);
  }, []);

  const addTestimonial = async (e) => {
    e.preventDefault();
    if (!userToken) {
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:9090/testimonials/add",
        {
          text: inputValue,
          savedUser: user,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(response.data);
      setInputValue("");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <footer className="footer p-lg-5 p-3">
      <div className="row">
        <div className="col-lg-5 col-12">
          <img
            src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684323842/Saafran/logos%20and%20icons/uehtxj5z00msvam1holg.png"
            className="w-25 mb-5"
          />
          <ul className="footer-nav">
            <li>Um</li>
            <li>Karriere</li>
            <li>Drücken Sie</li>
            <li>Kundendienst</li>
            <li>Dienstleistungen</li>
          </ul>
        </div>
        <div className="col-lg-7 col-12 d-flex justify-content-lg-end justify-content-center align-items-center mt-lg-0 mt-5">
          <div className="testimonial-field">
            <p>Erhalten Sie die aktuellsten Nachrichten von uns</p>
            <Form
              className="d-flex w-100"
              onSubmit={(e) => {
                addTestimonial(e);
              }}
            >
              <Form.Group controlId="testimonial-text-input" className="w-75">
                <Form.Control
                  type="text"
                  className="testimonial-text-input"
                  placeholder="Schreibe deinen Eindruck"
                  value={inputValue}
                  onChange={handleInputChange}
                  onClickCapture={handleInputFocus}
                ></Form.Control>
              </Form.Group>
              <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={isModalOpen}
                onHide={() => setIsModalOpen(false)}
              >
                <Modal.Body>
                  <Form.Control
                    as="textarea"
                    placeholder="Schreibe deinen Eindruck"
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                  <button
                    className="btn footer-btn float-end mt-3 w-25"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Ok
                  </button>
                </Modal.Body>
              </Modal>
              <button type="submit" className="footer-btn ms-2 btn w-25">
                Einreichen
              </button>
            </Form>
          </div>
        </div>
      </div>
      <p className="footer-small-text">
        Allgemeine Geschäftsbedingungen | Datenschutzrichtlinie |
        Barrierefreiheit | Rechtlich |
      </p>
      <div className="footer-divider"></div>
    </footer>
  );
}
