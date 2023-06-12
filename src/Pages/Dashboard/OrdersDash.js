import React, { useState } from "react";
import "./OrdersDash.css";
import Title from "../../Components/Title/Title";
import OrderCard from "./OrderCard";
import { Form } from "react-bootstrap";

export default function OrdersDash(props) {
  let filteredOrders = props.orders;
  const [filterPaymentValue, setFilterPaymentValue] = useState("");
  const handleFilterPaymentChange = (event) => {
    const filter = event.target.value;
    setFilterPaymentValue(filter);
  };
  const [filterStateValue, setFilterStateValue] = useState("");
  const handleFilterStateChange = (event) => {
    const filter = event.target.value;
    setFilterStateValue(filter);
  };

  // Filter the orders array based on the selected filter values
  if (filterPaymentValue === "true" || filterPaymentValue === "false") {
    filteredOrders = filteredOrders.filter(
      (order) => String(order.isPaid) === filterPaymentValue
    );
  }

  if (
    filterStateValue === "Processing" ||
    filterStateValue === "Shipped" ||
    filterStateValue === "Delivered" ||
    filterStateValue === "Cancelled"
  ) {
    filteredOrders = filteredOrders.filter(
      (order) => order.orderStatus === filterStateValue
    );
  }
  console.log(filteredOrders);

  return (
    <div>
      <Title content="Orders Dashboard" />
      <section className="filter-container row d-flex justify-content-end mb-3">
        <div className="col-3">
          <Form.Select
            aria-label="shippment filter"
            onChange={handleFilterStateChange}
          >
            <option value={""} selected>
              {filterStateValue === "" ? "Order state" : "Reset"}
            </option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </Form.Select>
        </div>
        <div className="col-3">
          <Form.Select
            aria-label="payment filter"
            onChange={handleFilterPaymentChange}
          >
            <option value={""} selected>
              {filterPaymentValue === "" ? "Payment state" : "Reset"}
            </option>
            <option value={"true"}>Paid</option>
            <option value={"false"}>Not paid</option>
          </Form.Select>
        </div>
        {/* <div className="col-4">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleFilterChange}
          >
            <option selected value="">
              {filterValue === "" ? "Filter" : "Reset"}
            </option>
            <optgroup label="Payment state">
              <option value={"true"}>Paid</option>
              <option value={"false"}>Not paid</option>
            </optgroup>
            <optgroup label="Order state">
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </optgroup>
          </select> 
        </div> */}
      </section>
      <section>
        {filteredOrders.map((order, index) => (
          <div key={index}>
            <OrderCard order={order} />
          </div>
        ))}
      </section>
    </div>
  );
}
