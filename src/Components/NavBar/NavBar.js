import React, { useEffect, useRef, useState } from "react";
import "./NavBar.css";
import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const [showLinks, setShowLinks] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  // const [showCartDropdown, setShowCartDropdown] = useState(false);
  const dropdownRef = useRef(null);
  // const cartDropdownRef = useRef(null);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  const toggleUserDropdown = (e) => {
    e.stopPropagation();
    setShowUserDropdown(!showUserDropdown);
  };

  // const toggleCartDropdown = (e) => {
  //   e.stopPropagation();
  //   setShowCartDropdown(!showCartDropdown);
  // };

  const closeUserDropdown = () => {
    setShowUserDropdown(false);
  };

  // const closeCartDropdown = () => {
  //   setShowCartDropdown(false);
  // };

  const location = useLocation();
  const path = location.pathname;
  console.log(path);
  const [user, setUser] = useState({
    name: "Vollständiger Name",
    img: "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684749461/Saafran/logos%20and%20icons/rpsyo19pqbdfnatqgllh.png",
    role: "user",
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeUserDropdown();
      }
    };
    // const handleClickOutsideCart = (event) => {
    //   if (
    //     cartDropdownRef.current &&
    //     !cartDropdownRef.current.contains(event.target)
    //   ) {
    //     closeCartDropdown();
    //   }
    // };

    document.addEventListener("click", handleClickOutside);
    // document.addEventListener("click", handleClickOutsideCart);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      // document.removeEventListener("click", handleClickOutsideCart);
    };
  }, []);

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
        <ul>
          <li onClick={toggleUserDropdown} className="user-dropdown-toggler">
            <img src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684329432/Saafran/logos%20and%20icons/ajmb86leiopbfjjqjbkn.png" />
          </li>
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
              <span className="user-info-name">{user.name} </span>
            </div>
            <div className="user-nav-cont mb-3">
              <ul className="user-nav d-flex flex-column align-items-center">
                <li>
                  <button className="user-nav-button mb-2 btn">
                    Konto verwalten
                  </button>
                </li>
                <li>
                  <button className="user-nav-button mb-2 btn">
                    Wunschliste
                  </button>
                </li>
                <li>
                  <button className="user-nav-button btn">Kaufhistorie</button>
                </li>
              </ul>
            </div>
            <div className="user-logOut-cont">
              <button className="user-logOut-button btn d-flex flex-column align-items-center">
                <img
                  src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684748678/Saafran/logos%20and%20icons/cceecuc034wqhh38ol7i.png"
                  alt="log out icon"
                  className="img-fluid"
                />
                <span>Ausloggen</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* {showCartDropdown && (
        <div
          className="user-dropdown-cont d-flex flex-column align-items-center"
          ref={cartDropdownRef}
        >
          <div class="triangle"></div>
          <div className="user-dropdown-content d-flex flex-column align-items-center justify-content-center p-3">
            {cart.map((item) => (
              <div className="cart-item">
                {item.weight} {item.name} X {item.quantity}
              </div>
            ))}
          </div>
        </div>
      )} */}
    </nav>
  );
}
