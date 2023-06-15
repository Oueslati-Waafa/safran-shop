import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { toast, ToastContainer } from "react-toastify";
import OrdersDash from "./OrdersDash";
import ProductsDash from "./ProductsDash";

export default function Dashboard(props) {
  const [currentDash, setCurrentDash] = useState("orders");
  const [user, setUser] = useState();
  const [userToken, setUserToken] = useState();
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user")) || [];
    setUser(savedUser);
    setUserToken(savedUser.token);
  }, []);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (!userToken) {
      return;
    }
    try {
      axios
        .get("http://localhost:9090/orders/getAll", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((result) => {
          setOrders(result.data);
        });
    } catch (error) {
      toast.error(
        "Authorization error, if you're the Admin, please try logging out and in!",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    }
  }, [user]);
  console.log(orders);
  useEffect(() => {
    props.setIsDashboard(true);

    return () => {
      props.setIsDashboard(false);
    };
  }, []);

  return (
    <main className="container">
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
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      {currentDash === "orders" ? (
        <OrdersDash orders={orders} setCurrentDash={setCurrentDash} />
      ) : currentDash === "products" ? (
        <ProductsDash setCurrentDash={setCurrentDash} />
      ) : null}
    </main>
  );
}
