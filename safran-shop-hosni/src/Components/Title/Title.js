import React from "react";
import "./Title.css";

export default function Title(props) {
  return (
    <div className="title-cont py-5 row">
      <div className="col">
        <div></div>
      </div>
      <p className="col">{props.content} </p>
      <div className="col">
        <div></div>
      </div>
    </div>
  );
}
