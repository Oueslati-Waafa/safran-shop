import React, { useEffect, useState } from "react";
import { CreditCard2Front, PatchCheck } from "react-bootstrap-icons";
import "./OrderSummary.css";
import MyButton from "../../Components/Buttons/MyButton";
import { Link } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

export default function OrderSummary({ setCurrentStep }) {
  const [cart, setCart] = useState([]);
  const [shippingInformation, setShippingInformation] = useState([]);
  const [totalItemsPrice, setTotalItemsPrice] = useState(0);
  const [totalItemsTax, setTotalItemsTax] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderToPay, setOrderToPay] = useState("");
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const savedShipping =
      JSON.parse(localStorage.getItem("shippingInfo")) || [];
    setCart(savedCart);
    setShippingInformation(savedShipping);
    const savedItemsTotal = savedCart.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0
    );
    setTotalItemsPrice(savedItemsTotal);
    const savedTax = ((savedItemsTotal / 100) * 7).toFixed(3);
    setTotalItemsTax(savedTax);
    setTotalPrice(
      (
        parseFloat(savedItemsTotal) +
        parseFloat(savedTax) +
        parseFloat(savedShipping.shippingFee)
      ).toFixed(3)
    );
  }, []);
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const [user, setUser] = useState();
  const [userToken, setUserToken] = useState();
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user")) || [];
    setUser(savedUser);
    setUserToken(savedUser.token);
  }, []);

  console.log(orderToPay);

  /* stock validation */

  const getProductById = async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:9090/products/${productId}`
      );
      console.log("found product", response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };

  console.log(cart);

  const compareProductCountInStockWithCart = async (productId) => {
    try {
      const product = await getProductById(productId);
      const cartItem = cart.find((item) => item._id === productId);

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

  /* place order */

  const makeOrder = async () => {
    const shippingInfo = {
      address: shippingInformation.address,
      city: shippingInformation.city,
      state: shippingInformation.state,
      country: shippingInformation.country,
      postalCode: shippingInformation.zipCode,
    };
    const orderItems = cart.map((item) => {
      const { _id, name, price, quantity, weight } = item;
      return { productId: _id, pName: weight + " " + name, price, quantity };
    });
    for (const item of cart) {
      const isStockSufficient = await compareProductCountInStockWithCart(
        item._id
      );
      console.log(isStockSufficient);
      if (!isStockSufficient) {
        toast.error(
          `Insufficient stock for product: ${item.weight} - ${item.name}`,
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
    if (orderToPay === "") {
      try {
        const response = await fetch("http://localhost:9090/orders/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            shippingInfo,
            orderItems,
            totalPrice,
            shippingPrice: parseFloat(shippingInformation?.shippingFee),
            taxPrice: totalItemsTax,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const orderId = data.orderId;
          setOrderToPay(orderId);
          console.log("Order placed successfully. Order ID:", orderId);
          localStorage.removeItem("cart");
          if (shippingInformation.payMeth === "CreditCard") {
            handleShowStripeModal();
          } else {
            handleShowPaypalModal();
          }
        } else {
          throw new Error("Failed to place the order.");
        }
      } catch (error) {
        console.error("Error placing the order:", error.message);
      }
    } else {
      if (shippingInformation.payMeth === "CreditCard") {
        handleShowStripeModal();
      } else {
        handleShowPaypalModal();
      }
    }
  };

  const updateProductCountInStock = async (id, quantity) => {
    try {
      const response = await axios.put(
        `http://localhost:9090/products/stock/${id}`,
        { quantity }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
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

  console.log(cart[0]);

  async function makeStripePayment(e) {
    console.log(orderToPay);
    e.preventDefault();
    if (
      number === "" ||
      expMonth === "" ||
      expYear === "" ||
      cvc === "" ||
      orderToPay === ""
    ) {
      return;
    }
    const card = {
      number: number,
      exp_month: expMonth,
      exp_year: expYear,
      cvc: cvc,
    };
    for (const item of cart) {
      const isStockSufficient = await compareProductCountInStockWithCart(
        item._id
      );
      console.log(isStockSufficient);
      if (!isStockSufficient) {
        toast.error(
          `Insufficient stock for product: ${item.weight} - ${item.name}`,
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
        orderId: orderToPay,
        card: card,
      };
      const response = await fetch(
        "http://localhost:9090/orders/stripe-payment",
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
        for (const item of cart) {
          await updateProductCountInStock(item._id, item.quantity);
        }
        console.log(data.message);
        toast.success("Payed successfully", {
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
        toast.error(`Error while paying: ${data.error}`, {
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
      console.error("An error occurred:", error);
      toast.error(`Error while paying: ${error}`, {
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

  /* PayPal part */

  async function makePaypalPayment(e) {
    e.preventDefault();
    if (!user || !orderToPay || !userToken) {
      return;
    }
    console.log(user);
    console.log(orderToPay);
    for (const item of cart) {
      const isStockSufficient = await compareProductCountInStockWithCart(
        item._id
      );
      console.log(isStockSufficient);
      if (!isStockSufficient) {
        toast.error(
          `Insufficient stock for product: ${item.weight} - ${item.name}`,
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
        "http://localhost:9090/orders/create-paypal-payment",
        {
          orderId: orderToPay,
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
          for (const item of cart) {
            await updateProductCountInStock(item._id, item.quantity);
          }
          // Redirect the user to the PayPal approval URL
          window.location.href = data.approvalUrl;
        } else {
          console.error(data.error); // Log the error message
          // Handle the error in your client-side code
        }
      })
      .catch((error) => {
        console.error("Failed to create PayPal payment:", error);
        // Handle the error in your client-side code
      });
  }

  return (
    <main className="orderPay-page container">
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
        <p className="step-name step-name-done col">Zahlung</p>
      </div>
      <section className="orderSummary">
        <div className="orderSummary-items">
          {cart.map((item, index) => (
            <div className="orderSummary-item" key={index}>
              <p className="orderSummary-item-details">
                {item.weight} - {item.name} X {item.quantity}
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
            <p>{totalItemsPrice} €</p>
          </div>
          <div className="orderSummary-fee">
            <p>MwSt.(7%)</p>
            <p>{totalItemsTax} €</p>
          </div>
          <div className="orderSummary-fee">
            <p>Versandgebühr</p>
            <p>
              {shippingInformation.shippingFee === 0
                ? "FREI"
                : shippingInformation.shippingFee === 10
                ? "10 £"
                : "25 £"}
            </p>
          </div>
        </div>
        <div className="orderSummary-divider"></div>
        <div className="orderSummary-total">
          <p>Gesamt</p>
          <p>{totalPrice} €</p>
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
          makeOrder();
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
      <Modal show={showStripeModal} onHide={handleCloseStripeModal} centered>
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
      <Modal show={showPaypalModal} onHide={handleClosePaypalModal} centered>
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
              <Form.Control type="number" value={totalPrice} readOnly />
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
  );
}
