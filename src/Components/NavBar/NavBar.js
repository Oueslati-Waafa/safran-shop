import React from "react";
import "./NavBar.css";

export default function NavBar() {
  return (
    <nav className="row">
      <div className="logo-cont col-3">
        <img
          className="nav-logo"
          src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684323842/Saafran/logos%20and%20icons/uehtxj5z00msvam1holg.png"
        />
      </div>
      <div className="links-cont col-6">
        <ul>
          <li>HOME</li>
          <li>ÜBER UNS</li>
          <li>KONTAKT</li>
        </ul>
      </div>
      <div className="buttons-cont col-3">
        <ul>
          <li>
            <img src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684329432/Saafran/logos%20and%20icons/ajmb86leiopbfjjqjbkn.png" />
          </li>
          <li>
            <img src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684329568/Saafran/logos%20and%20icons/ktowelsvq2yuqywdsac2.png" />
          </li>
        </ul>
      </div>
    </nav>
  );
}
