import React, { useEffect, useRef, useState } from "react";
import "./NavBar.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { PersonGear } from "react-bootstrap-icons";

export default function NavBar() {
  const [showLinks, setShowLinks] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  const toggleUserDropdown = (e) => {
    e.stopPropagation();
    setShowUserDropdown(!showUserDropdown);
  };

  const closeUserDropdown = () => {
    setShowUserDropdown(false);
  };

  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeUserDropdown();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const [user, setUser] = useState();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user")) || null;
    setUser(savedUser);
  }, [path]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
    setIsLoggedIn(loggedIn);
  }, [path]);

  const [dbUser, setDbUser] = useState();
  useEffect(() => {
    if (user) {
      axios.get(`https://safran.onrender.com/users/${user.id}`).then((result) => {
        setDbUser(result.data);
      });
    } else {
      return;
    }
  }, [user]);

  return (
    <nav className="row">
      <div className="logo-cont col-lg-3 col-6">
        <Link to={"/"}>
          <img
            className="nav-logo"
            src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684323842/Saafran/logos%20and%20icons/uehtxj5z00msvam1holg.png"
          />
        </Link>
      </div>
      <div className="links-cont col-lg-6 d-lg-flex justify-content-lg-center d-none">
        <ul>
          <li className={path === "/" ? "nav-active" : ""}>
            <Link to={"/"} onClick={() => window.scrollTo(0, 0)}>
              HOME
            </Link>
          </li>
          <li className={path.includes("about") ? "nav-active" : ""}>
            <Link to={"/about"} onClick={() => window.scrollTo(0, 0)}>
              ÜBER UNS
            </Link>
          </li>
          <li className={path.includes("contact") ? "nav-active" : ""}>
            <Link to={"/contact"} onClick={() => window.scrollTo(0, 0)}>
              KONTAKT
            </Link>
          </li>
        </ul>
      </div>
      <div className="buttons-cont col-lg-3 col-6">
        <ul className={isLoggedIn ? "loggedUl" : "notLoggedUl"}>
          {isLoggedIn ? (
            <li onClick={toggleUserDropdown} className="user-dropdown-toggler">
              {dbUser?.isAdmin ? (
                <PersonGear color="#f5f5f5" size={25} />
              ) : (
                <img src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684329432/Saafran/logos%20and%20icons/ajmb86leiopbfjjqjbkn.png" />
              )}
            </li>
          ) : (
            <li>
              <button className="btn btn-light me-4">
                <Link to={"/log"}>Log in</Link>
              </button>
            </li>
          )}
          <li>
            {/* onClick={toggleCartDropdown} */}
            <Link to={"/cart"}>
              <img src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684329568/Saafran/logos%20and%20icons/ktowelsvq2yuqywdsac2.png" />
            </Link>
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
      {showUserDropdown && (
        <div
          className="user-dropdown-cont d-flex flex-column align-items-center"
          ref={dropdownRef}
        >
          <div class="triangle"></div>
          <div className="user-dropdown-content d-flex flex-column align-items-center justify-content-center p-3">
            <div className="user-info mb-3 text-center d-flex flex-column align-items-center">
              <img
                src={user.img}
                alt="user image"
                className="img-fluid rounded-circle img-thumbnail user-info-img"
              />
              <span className="user-info-name">
                {user.fname} {user.lname}
              </span>
            </div>
            <div className="user-nav-cont mb-3">
              <ul className="user-nav d-flex flex-column align-items-center">
                <li>
                  <button
                    className="user-nav-button mb-2 btn"
                    onClick={() => {
                      setShowUserDropdown(false);
                    }}
                  >
                    <Link to={"/account"}>Konto verwalten</Link>
                  </button>
                </li>
                <li>
                  <button
                    className="user-nav-button mb-2 btn"
                    onClick={() => {
                      setShowUserDropdown(false);
                    }}
                  >
                    <Link to={"/wishlist"}>Wunschliste</Link>
                  </button>
                </li>
                <li>
                  <button
                    className="user-nav-button btn"
                    onClick={() => {
                      setShowUserDropdown(false);
                    }}
                  >
                    <Link to={"/orders"}>Kaufhistorie</Link>
                  </button>
                </li>
                {dbUser?.isAdmin ? (
                  <li className="mt-2">
                    <button
                      className="user-nav-button btn"
                      onClick={() => {
                        setShowUserDropdown(false);
                      }}
                    >
                      <Link to={"/dashboard"}>Dashboard</Link>
                    </button>
                  </li>
                ) : null}
              </ul>
            </div>
            <div className="user-logOut-cont">
              <button
                className="user-logOut-button btn d-flex flex-column align-items-center"
                onClick={() => {
                  setShowUserDropdown(false);
                  localStorage.setItem("loggedIn", false);
                  localStorage.removeItem("user");
                  localStorage.removeItem("cart");
                  localStorage.removeItem("shippingInfo");
                }}
              >
                <Link to={"/log"}>
                  <img
                    src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684748678/Saafran/logos%20and%20icons/cceecuc034wqhh38ol7i.png"
                    alt="log out icon"
                    className="img-fluid"
                  />
                  <p>Ausloggen</p>
                </Link>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
