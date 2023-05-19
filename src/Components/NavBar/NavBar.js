import React, { useState } from "react";
import "./NavBar.css";
import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const [showLinks, setShowLinks] = useState(false);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  const location = useLocation();
  const path = location.pathname;
  console.log(path);

  return (
    <nav className="row">
      <div className="logo-cont col-lg-3 col-6">
        <img
          className="nav-logo"
          src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684323842/Saafran/logos%20and%20icons/uehtxj5z00msvam1holg.png"
        />
      </div>
      <div className="links-cont col-lg-6 d-lg-flex justify-content-lg-center d-none">
        <ul>
          <li className={path === "/" ? "active" : ""}>
            <Link to={"/"} onClick={() => window.scrollTo(0, 0)}>
              HOME
            </Link>
          </li>
          <li className={path.includes("about") ? "active" : ""}>
            <Link to={"/about"} onClick={() => window.scrollTo(0, 0)}>
              ÜBER UNS
            </Link>
          </li>
          <li className={path.includes("contact") ? "active" : ""}>
            <Link to={"/contact"} onClick={() => window.scrollTo(0, 0)}>
              KONTAKT
            </Link>
          </li>
        </ul>
      </div>
      <div className="buttons-cont col-lg-3 col-6">
        <ul>
          <li>
            <img src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684329432/Saafran/logos%20and%20icons/ajmb86leiopbfjjqjbkn.png" />
          </li>
          <li>
            <img src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684329568/Saafran/logos%20and%20icons/ktowelsvq2yuqywdsac2.png" />
          </li>
          <li className="ms-1 d-block d-lg-none toggler" onClick={toggleLinks}>
            <img
              src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684417851/Saafran/logos%20and%20icons/clqmgwqxzqatem9xgsoo.png"
              style={{ width: "18px" }}
            />
          </li>
        </ul>
      </div>
      <div
        className={`links-cont-mobile col-12 d-flex justify-content-center ${
          showLinks ? "" : "d-none"
        }`}
      >
        <ul>
          <li>
            <Link to={"/"} onClick={toggleLinks}>
              HOME
            </Link>
          </li>
          <li>
            <Link to={"/about"} onClick={toggleLinks}>
              ÜBER UNS
            </Link>
          </li>
          <li>
            <Link to={"/contact"} onClick={toggleLinks}>
              KONTAKT
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
