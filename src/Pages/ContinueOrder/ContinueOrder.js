import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { CreditCard2Front } from "react-bootstrap-icons";
import { Link, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import MyButton from "../../Components/Buttons/MyButton";
import ShippingPay from "../CheckoutPage/ShippingPay";
import ThankPage from "../CheckoutPage/ThankPage";
import "./ContinueOrder.css";

export default function ContinueOrder() {
  const [currentStep, setCurrentStep] = useState("payMeth");
  const [orderId, setOrderId] = useState();
  const [order, setOrder] = useState();
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    const parts = path.split("/");
    setOrderId(parts[2]);
  }, [location]);
  const [user, setUser] = useState();
  const [userToken, setUserToken] = useState();
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user")) || [];
    setUser(savedUser);
    setUserToken(savedUser.token);
  }, []);
  useEffect(() => {
    if (orderId) {
      axios
        .get(`https://safran.onrender.com/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((result) => {
          setOrder(result.data);
        });
    } else {
      return;
    }
  }, [orderId]);
  const calculateTotal = () => {
    let total = 0;

    order.orderItems.forEach((product) => {
      const { price, quantity } = product;
      total += price * quantity;
    });

    return total;
  };
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  /* select pay meth */

  const [selectedPayMeth, setSelectedPayMeth] = useState("none");

  const savePayMeth = () => {
    const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo")) || {};
    const updatedShippingInfo = {
      ...shippingInfo,
      payMeth: selectedPayMeth,
    };
    localStorage.setItem("shippingInfo", JSON.stringify(updatedShippingInfo));
    setCurrentStep("paying");
  };

  useEffect(() => {
    // Load the selected shipping fee from local storage
    const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo")) || [];
    if (shippingInfo !== []) {
      setSelectedPayMeth(shippingInfo.payMeth);
      console.log(shippingInfo.payMeth);
    }
  }, []);

  /* payment section */

  const payOrder = () => {
    if (selectedPayMeth === "CreditCard") {
      handleShowStripeModal();
    } else {
      handleShowPaypalModal();
    }
  };

  /* update stock */

  const updateProductCountInStock = async (id, quantity) => {
    try {
      const response = await axios.put(
        `https://safran.onrender.com/products/stock/${id}`,
        { quantity }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };

  /* stock validation */

  const getProductById = async (productId) => {
    try {
      const response = await axios.get(
        `https://safran.onrender.com/products/${productId}`
      );
      console.log("found product", response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };
  const compareProductCountInStockWithCart = async (productId) => {
    try {
      const product = await getProductById(productId);
      const cartItem = order.orderItems.find(
        (item) => item.productId === productId
      );

      if (!product) {
        throw new Error(`Product not found for ID: ${productId}`);
      }

      if (!cartItem) {
        throw new Error(`Product with ID ${productId} not found in cart`);
      }

      const { countInStock } = product;
      const { quantity } = cartItem;

      return countInStock >= quantity;
    } catch (error) {
      console.error("Error comparing product count in stock with cart:", error);
      throw error;
    }
  };

  /* stripe part */

  const [showStripeModal, setShowStripeModal] = useState(false);
  const [showPaypalModal, setShowPaypalModal] = useState(false);
  const [number, setNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvc, setCvc] = useState("");

  const handleCloseStripeModal = () => setShowStripeModal(false);
  const handleShowStripeModal = () => setShowStripeModal(true);

  const handleClosePaypalModal = () => setShowPaypalModal(false);
  const handleShowPaypalModal = () => setShowPaypalModal(true);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  };

  const handleCardNumberChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, "");
    setNumber(inputValue);
  };

  const handleCvcChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, "");
    setCvc(inputValue);
  };

  async function makeStripePayment(e) {
    console.log(orderId);
    e.preventDefault();
    if (
      number === "" ||
      expMonth === "" ||
      expYear === "" ||
      cvc === "" ||
      orderId === ""
    ) {
      return;
    }
    const card = {
      number: number,
      exp_month: expMonth,
      exp_year: expYear,
      cvc: cvc,
    };
    for (const item of order.orderItems) {
      const isStockSufficient = await compareProductCountInStockWithCart(
        item.productId
      );
      console.log(isStockSufficient);
      if (!isStockSufficient) {
        toast.error(
          `Unzureichender Lagerbestand für das Produkt: ${item.pName}`,
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
        return; // Exit the function if stock is insufficient
      }
    }
    try {
      const requestBody = {
        orderId: orderId,
        card: card,
      };
      const response = await fetch(
        "https://safran.onrender.com/orders/stripe-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify(requestBody),
        }
      );
      const data = await response.json();
      if (response.ok) {
        for (const item of order.orderItems) {
          await updateProductCountInStock(item.productId, item.quantity);
        }
        console.log(data.message);
        toast.success("Erfolgreich bezahlt", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setCurrentStep("thank");
      } else {
        // Payment failed
        console.error(data.error);
        toast.error(`Fehler beim Bezahlen: ${data.error}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        // Display an error message to the user or handle the error accordingly
      }
    } catch (error) {
      console.error("Ein Fehler ist aufgetreten:", error);
      toast.error(`Fehler beim Bezahlen: ${error}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      // Display an error message to the user or handle the error accordingly
    }
  }

  console.log(order?.orderItems);

  /* PayPal part */

  async function makePaypalPayment(e) {
    e.preventDefault();
    if (!user || !orderId || !userToken) {
      return;
    }
    console.log(user);
    console.log(orderId);
    for (const item of order.orderItems) {
      const isStockSufficient = await compareProductCountInStockWithCart(
        item.productId
      );
      console.log(isStockSufficient);
      if (!isStockSufficient) {
        toast.error(
          `Unzureichender Lagerbestand für das Produkt: ${item.pName}`,
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
        return; // Exit the function if stock is insufficient
      }
    }
    axios
      .post(
        "https://safran.onrender.com/orders/create-paypal-payment",
        {
          orderId: orderId,
          user: user,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then(async (response) => {
        const data = response.data;
        // Handle the response from the server
        if (data.approvalUrl) {
          for (const item of order.orderItems) {
            await updateProductCountInStock(item.productId, item.quantity);
          }
          // Redirect the user to the PayPal approval URL
          window.location.href = data.approvalUrl;
        } else {
          console.error(data.error); // Log the error message
          // Handle the error in your client-side code
        }
      })
      .catch((error) => {
        console.error("PayPal-Zahlung konnte nicht erstellt werden:", error);
        // Handle the error in your client-side code
      });
  }
  return (
    <>
      {currentStep === "payMeth" ? (
        <main className="pay-page container">
          <section className="pay-page container mb-5">
            <div className="pay-meths-cont row">
              <div
                className={`pay-meth col-sm-4 col-10 ${
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
                  className="img-fluid pay-meth-icon paypal-icon"
                  alt="payment method icon"
                  src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684922713/Saafran/logos%20and%20icons/ekyeumi0y6ou1dpynh5u.png"
                />
              </div>
              <div
                className={`pay-meth col-sm-4 col-10 ${
                  selectedPayMeth === "CreditCard" ? "pay-meth-selected" : ""
                }`}
                onClick={() => {
                  setSelectedPayMeth("CreditCard");
                }}
              >
                <img
                  src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684856152/Saafran/logos%20and%20icons/qbo4wiibjaje8e57ziqv.png"
                  alt="border icon"
                  className={`border-icon img-fluid ${
                    selectedPayMeth === "CreditCard" ? "" : "d-none"
                  }`}
                />
                <img
                  className="img-fluid pay-meth-icon credit-icon"
                  alt="payment method icon"
                  src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1685974713/Saafran/logos%20and%20icons/vjlu9ihg0wb8oaudeqjc.png"
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
            disabled={
              selectedPayMeth === "none" || selectedPayMeth === undefined
            }
            toDo={savePayMeth}
          />
        </main>
      ) : currentStep === "paying" ? (
        <main className="orderPay-page container my-5 py-5">
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="dark"
          />
          <section className="orderSummary">
            <div className="orderSummary-items">
              {order.orderItems.map((item, index) => (
                <div className="orderSummary-item" key={index}>
                  <p className="orderSummary-item-details">
                    {item.pName} X {item.quantity}
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
                <p>Preis der Artikel</p>
                <p>{calculateTotal()} €</p>
              </div>
              <div className="orderSummary-fee">
                <p>MwSt.(7%)</p>
                <p>{order.taxPrice} €</p>
              </div>
              <div className="orderSummary-fee">
                <p>Versandgebühr</p>
                <p>
                  {order.shippingPrice === 0
                    ? "FREI"
                    : order.shippingPrice === 10
                    ? "10 £"
                    : "25 £"}
                </p>
              </div>
            </div>
            <div className="orderSummary-divider"></div>
            <div className="orderSummary-total">
              <p>Gesamt</p>
              <p>{order.totalPrice} €</p>
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
              payOrder();
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
          <Modal
            show={showStripeModal}
            onHide={handleCloseStripeModal}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Kartendetails</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                onSubmit={(e) => {
                  makeStripePayment(e);
                }}
              >
                <Form.Group controlId="cardNumber">
                  <Form.Label className="text-light">Kartennummer</Form.Label>
                  <Form.Control
                    type="text"
                    value={number}
                    pattern="[0-9]{14,16}"
                    maxLength={16}
                    minLength={14}
                    onChange={handleCardNumberChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="expirationDate">
                  <Form.Label className="text-light">Ablaufdatum</Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      type="month"
                      value={`${expYear}-${expMonth}`}
                      min={getCurrentDate()}
                      onChange={(e) => {
                        const [year, month] = e.target.value.split("-");
                        setExpMonth(month);
                        setExpYear(year);
                      }}
                      required
                    />
                  </div>
                </Form.Group>
                <Form.Group controlId="cvc">
                  <Form.Label className="text-light">CVV</Form.Label>
                  <Form.Control
                    type="text"
                    pattern="[0-9]{3,4}"
                    maxLength={4}
                    minLength={3}
                    value={cvc}
                    onChange={handleCvcChange}
                    required
                  />
                </Form.Group>

                <div className="d-flex justify-content-center">
                  <button
                    className="btn stripe-pay-btn d-flex justify-content-center align-items-center"
                    type="submit"
                  >
                    <CreditCard2Front />
                    <span className="ms-2">Bezahlen</span>
                  </button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
          <Modal
            show={showPaypalModal}
            onHide={handleClosePaypalModal}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>PayPal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                onSubmit={(e) => {
                  makePaypalPayment(e);
                }}
              >
                <Form.Group controlId="cardNumber">
                  <Form.Label className="text-light">
                    Betrag, der in £ zu zahlen ist
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={order.totalPrice}
                    readOnly
                  />
                </Form.Group>
                <div className="d-flex justify-content-center">
                  <button className="paypal-button" type="submit">
                    <img
                      className="img-fluid"
                      src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1686053356/Saafran/logos%20and%20icons/o9n4kdozp7o2agck5gay.png"
                      alt="paypal icon"
                    />
                  </button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
        </main>
      ) : (
        <ThankPage />
      )}
    </>
  );
}
