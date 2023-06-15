import React from "react";
import "./Buttons.css";
import { Link } from "react-router-dom";

export default function ContinueShopping(props) {
  return (
    <div className="d-flex justify-content-center mt-5">
      <button className={`btn myButton ${props.size}`}>
        <Link to={"/"} onClick={() => window.scrollTo(0, 0)}>
          EINKAUFEN GEHEN
        </Link>
      </button>
    </div>
  );
}
