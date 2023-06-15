import React from "react";
import "./Buttons.css";
import { Link } from "react-router-dom";

export default function MyButton(props) {
  return (
    <div className="d-flex justify-content-center mt-5 myButton-cont">
      <button
        className={`btn myButton ${props.size}`}
        onClick={props.toDo}
        disabled={props.disabled}
        onMouseEnter={props.hover}
      >
        <Link to={props.direction} onClick={() => window.scrollTo(0, 0)}>
          {props.text}
        </Link>
      </button>
    </div>
  );
}
