import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function OrderCard(props) {
  //   const calculateTotal = () => {
  //     let total = 0;

  //     props.order.orderItems.forEach((product) => {
  //       const { price, quantity } = product;
  //       total += price * quantity;
  //     });

  //     return total;
  //   };
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
  /* client details modal */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const [user, setUser] = useState();
  const [userToken, setUserToken] = useState();
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user")) || [];
    setUser(savedUser);
    setUserToken(savedUser.token);
  }, []);
  const [updatedOrderState, setUpdatedOrderState] = useState("");
  const updateOrder = async (orderId, updateFields) => {
    if (!userToken) {
      return;
    }
    try {
      const response = await axios.put(
        `https://safran.onrender.com/orders/${orderId}`,
        updateFields,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };

  const handleOrderStatusChange = async (e) => {
    const selectedStatus = e.target.value;
    setUpdatedOrderState(selectedStatus);

    try {
      await updateOrder(props.order._id, { orderStatus: selectedStatus });
      // Update the order data after successful update
      props.order.orderStatus = selectedStatus;
      toast.success("Order updated successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error(error);
      toast.error("Error while updating the order", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  return (
    <section className="orderSummary mb-5">
      <div className="orderSummary-items">
        {props.order.orderItems.map((item, index) => (
          <div className="orderSummary-item" key={index}>
            <p className="orderSummary-item-details">{item.pName}</p>
            <p className="orderSummary-item-total">X {item.quantity}</p>
          </div>
        ))}
      </div>
      <div className="orderSummary-divider"></div>
      <div className="orderSummary-fees">
        <div className="orderSummary-fee">
          <p>Erstellt am</p>
          <p>{transformDateFormat(props.order.createdAt)}</p>
        </div>
        <div className="orderSummary-fee">
          <p>Bezahlt am</p>
          <p>
            {props.order.isPaid
              ? transformDateFormat(props.order.paidAt)
              : "Ausstehend"}
          </p>
        </div>
        <div className="orderSummary-fee">
          <p>Bestellstatus</p>
          <Form.Select
            aria-label="shippment filter"
            defaultValue={props.order.orderStatus}
            className="orderStatusSelect"
            onChange={handleOrderStatusChange}
          >
            <option
              defaultValue="Processing"
              selected={props.order.orderStatus === "Processing"}
            >
              In Bearbeitung
            </option>
            <option
              defaultValue="Shipped"
              selected={props.order.orderStatus === "Shipped"}
            >
              Versandt
            </option>
            <option
              defaultValue="Delivered"
              selected={props.order.orderStatus === "Delivered"}
            >
              Zugestellt
            </option>
            <option
              defaultValue="Cancelled"
              selected={props.order.orderStatus === "Cancelled"}
            >
              Storniert
            </option>
          </Form.Select>
        </div>
        <div className="orderSummary-fee">
          <p>Kunde</p>
          <p>
            <Link className="text-light" onClick={handleModalOpen}>
              {props.order.user.fname} {props.order.user.lname}
            </Link>
          </p>
        </div>
      </div>
      <div className="orderSummary-divider"></div>
      <div className="orderSummary-total">
        <p>Gesamtbestellwert</p>
        <p>{props.order.totalPrice} €</p>
      </div>
      <Modal
        size="lg"
        aria-labelledby="client-details-modal"
        centered
        show={isModalOpen}
        onHide={handleModalClose}
      >
        <Modal.Body>
          <div className="row d-flex align-items-center justify-content-center">
            <div className="col-sm-4 col-8">
              <img
                src={props.order.user.imageUrl[0]}
                alt="user profile image"
                className="img-fluid rounded-circle img-thumbnail"
              />
            </div>
            <div className="orderSummary-fees text-light col-md-8 col-12">
              <div className="orderSummary-fee">
                <p>Vollständiger Name:</p>
                <p>
                  {props.order.user.fname} {props.order.user.lname}
                </p>
              </div>
              <div className="orderSummary-fee">
                <p>E-Mail:</p>
                <p>{props.order.user.email}</p>
              </div>
              <div className="orderSummary-fee">
                <p>Adress:</p>
                <p>{props.order.shippingInfo.address}</p>
              </div>
              <div className="orderSummary-fee">
                <p>Stadt:</p>
                <p>{props.order.shippingInfo.city}</p>
              </div>
              <div className="orderSummary-fee">
                <p>Land:</p>
                <p>{props.order.shippingInfo.country}</p>
              </div>
              <div className="orderSummary-fee">
                <p>Bundesland:</p>
                <p>{props.order.shippingInfo.state}</p>
              </div>
              <div className="orderSummary-fee">
                <p>Postleitzahl:</p>
                <p>{props.order.shippingInfo.postalCode}</p>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
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
    </section>
  );
}
