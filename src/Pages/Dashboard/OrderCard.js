import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

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
        `http://localhost:9090/orders/${orderId}`,
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
    } catch (error) {
      console.error(error);
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
          <p>Created at</p>
          <p>{transformDateFormat(props.order.createdAt)}</p>
        </div>
        <div className="orderSummary-fee">
          <p>Paid at</p>
          <p>
            {props.order.isPaid
              ? transformDateFormat(props.order.paidAt)
              : "pending"}
          </p>
        </div>
        <div className="orderSummary-fee">
          <p>Order state</p>
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
              Processing
            </option>
            <option
              defaultValue="Shipped"
              selected={props.order.orderStatus === "Shipped"}
            >
              Shipped
            </option>
            <option
              defaultValue="Delivered"
              selected={props.order.orderStatus === "Delivered"}
            >
              Delivered
            </option>
            <option
              defaultValue="Cancelled"
              selected={props.order.orderStatus === "Cancelled"}
            >
              Cancelled
            </option>
          </Form.Select>
        </div>
        <div className="orderSummary-fee">
          <p>Client</p>
          <p>
            <Link className="text-light" onClick={handleModalOpen}>
              {props.order.user.fname} {props.order.user.lname}
            </Link>
          </p>
        </div>
      </div>
      <div className="orderSummary-divider"></div>
      <div className="orderSummary-total">
        <p>Order total</p>
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
                <p>Full name:</p>
                <p>
                  {props.order.user.fname} {props.order.user.lname}
                </p>
              </div>
              <div className="orderSummary-fee">
                <p>Email:</p>
                <p>{props.order.user.email}</p>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* <button className="btn btn-link"><Trash color="yellow" size={25} /></button> */}
    </section>
  );
}
