import React, { useEffect, useState } from "react";
import Title from "../../Components/Title/Title";
import "./OrderHistory.css";
import axios from "axios";
import OrderItem from "./OrderItem";
import MyButton from "../../Components/Buttons/MyButton";
import { BoxSeam, Clock, Truck, XCircle } from "react-bootstrap-icons";

export default function OrderHistory() {
  const [user, setUser] = useState();
  const [userToken, setUserToken] = useState();
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user")) || [];
    setUser(savedUser);
    setUserToken(savedUser.token);
  }, []);

  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    if (!userToken) {
      return;
    }
    axios
      .get("https://safran.onrender.com/orders/my-orders", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        params: {
          user: user,
        },
      })
      .then((result) => {
        setMyOrders(result.data.orders);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  const [notice, setNotice] = useState("loading");

  useEffect(() => {
    setTimeout(() => {
      setNotice("empty");
    }, 3000);
  }, []);

  function transformDateFormat(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so we add 1
    const year = date.getFullYear();
    const formattedDate = `${day.toString().padStart(2, "0")}/${month
      .toString()
      .padStart(2, "0")}/${year}`;
    return formattedDate;
  }

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  console.log(myOrders);
  return (
    <main className="orders-cont container">
      <h1 className="text-center fw-bold display-3 my-5">Kaufhistorie</h1>
      {myOrders.length === 0 ? (
        notice === "loading" ? (
          <p className="fs-3 fw-bold text-center">Bitte warten Sie...</p>
        ) : (
          <p className="fs-3 fw-bold text-center">
            Sie haben keine Bestellungen.
          </p>
        )
      ) : (
        <>
          {myOrders.map((order, index) => (
            <div className="order-cont" key={index}>
              <Title
                content={`Created at ${transformDateFormat(order.createdAt)}`}
              />
              <div
                className={`cart-items row d-flex justify-content-lg-between justify-content-center ${
                  order.orderItems.length % 2 === 1 ? "centered-column" : ""
                }`}
              >
                {order.orderItems.map((item, index) => (
                  <OrderItem key={index} item={item} />
                ))}
              </div>
              <p className="order-detail">
                Total items price : {order.totalPrice} £
              </p>
              {order?.isPaid ? (
                <p className="order-detail">
                  Paid at {transformDateFormat(order.paidAt)}
                </p>
              ) : (
                <div className="mb-5">
                  <MyButton
                    text={"Pay now"}
                    size={
                      width > 992
                        ? "smallButton"
                        : width < 992 && width > 576
                        ? "mediumButton"
                        : "largeButton"
                    }
                    direction={`/order/${order._id}`}
                  />
                </div>
              )}
              {order?.isPaid ? (
                <>
                  <p className="order-detail">Order state</p>
                  <p className="order-detail">
                    {order.orderStatus}{" "}
                    {order.orderStatus === "Cancelled" ? (
                      <XCircle color="#841315" size={30} />
                    ) : order.orderStatus === "Processing" ? (
                      <Clock color="#e5ba5d" size={30} />
                    ) : order.orderStatus === "Shipped" ? (
                      <Truck color="#e5ba5d" size={30} />
                    ) : order.orderStatus === "Delivered" ? (
                      <BoxSeam color="green" size={30} />
                    ) : null}
                  </p>
                </>
              ) : null}
            </div>
          ))}
        </>
      )}
    </main>
  );
}
