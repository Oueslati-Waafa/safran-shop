import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import PhoneInput from "react-phone-input-2";
import { toast, ToastContainer } from "react-toastify";
import Title from "../../Components/Title/Title";
import "./AccountDetails.css";

export default function AccountDetails() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [allowModifyButton, setAllowModifyButton] = useState(false);
  const [allowModifyPWButton, setAllowModifyPWButton] = useState(false);
  const [isValidModification, setIsValidModification] = useState(true);
  const [isValidPWModification, setIsValidPWModification] = useState(true);

  const [user, setUser] = useState();
  const [refreshUser, setRefreshUser] = useState(0);
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user")) || [];
    setUser(savedUser);
  }, [refreshUser]);

  useEffect(() => {
    setFname(user?.fname);
    setLname(user?.lname);
    setEmail(user?.email);
    setPhoneNumber(user?.phoneNumber);
  }, [user]);

  console.log(lname);
  console.log(user);
  console.log(
    fname === user?.fname &&
      lname === user?.lname &&
      email === user?.email &&
      phoneNumber === user?.phoneNumber
  );

  const updateUserInfo = async (e) => {
    e.preventDefault();
    if (fname === "" || lname === "" || email === "" || phoneNumber === "") {
      toast.error("Bitte füllen Sie alle Felder aus!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    if (
      fname === user?.fname &&
      lname === user?.lname &&
      email === user?.email &&
      phoneNumber === user?.phoneNumber
    ) {
      toast.error("Es wurden keine Änderungen vorgenommen!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setAllowModifyButton(false);
      return;
    }
    if (isValidModification) {
      try {
        const response = await axios.put(
          `http://localhost:9090/users/${user.id}`,
          {
            fname: fname,
            lname: lname,
            email: email,
            phoneNumber: phoneNumber,
          }
        );
        console.log(response);
        const userToSave = {
          fname: response.data.fname,
          lname: response.data.lname,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
          img: response.data.imageUrl[0],
          token: response.data.token,
          id: response.data._id,
        };
        localStorage.setItem("user", JSON.stringify(userToSave));
        setRefreshUser(refreshUser + 1);
        setAllowModifyButton(false);
        toast.success("Änderungen erfolgreich gespeichert.", {
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
        console.error(error.response.data); // error message if not successful
        toast.error(error.response.data, {
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
    }
  };
  const updateUserPW = async (e) => {
    e.preventDefault();
    if (oldPassword === "" || newPassword === "") {
      toast.error("Bitte füllen Sie alle Felder aus!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    if (oldPassword === newPassword) {
      toast.error("Es wurden keine Änderungen vorgenommen!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setAllowModifyPWButton(false);
      return;
    }
    if (isValidPWModification) {
      try {
        const response = await axios.post(
          `http://localhost:9090/auth/reset/${user.id}`,
          {
            oldPassword: oldPassword,
            newPassword: newPassword,
          }
        );
        console.log(response);
        setAllowModifyPWButton(false);
        toast.success("Änderungen erfolgreich gespeichert.", {
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
        console.error(error.response.data); // error message if not successful
        toast.error(error.response.data, {
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
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const showPassword = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <main className="account-page container mb-5">
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
      <h1 className="text-center fw-bold display-3 my-5">Konto verwalten</h1>
      <Title content={"Persönliche Informationen"} />
      <section className="personal-info-cont row d-flex justify-content-evenly">
        <div className="col-lg-2 col-6 d-flex flex-column align-items-center justify-content-center">
          <img
            className="img-fluid personal-info-img"
            alt="profile image"
            src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1685028523/Saafran/logos%20and%20icons/vxa76gmqws5ank9j7a9q.png"
          />
          <p className="personal-info-name mt-3">
            {user?.fname} {user?.lname}
          </p>
          <button
            className="btn changePW-btn mb-lg-0 mb-5"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Passwort ändern
          </button>
        </div>
        <div className="personal-info-edit col-lg-8 col-10 d-flex justify-content-center align-items-center py-lg-0 py-5">
          <Form
            className="row d-flex justify-content-evenly align-items-center p-3"
            onSubmit={(e) => {
              updateUserInfo(e);
            }}
          >
            <Form.Group className="col-md-5 col-10 mb-3">
              <Form.Label>Vorname</Form.Label>
              <Form.Control
                type="text"
                value={fname}
                onChange={(e) => {
                  setFname(e.target.value);
                  setAllowModifyButton(true);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="col-md-5 col-10 mb-3">
              <Form.Label>Familienname, Nachname</Form.Label>
              <Form.Control
                type="text"
                value={lname}
                onChange={(e) => {
                  setLname(e.target.value);
                  setAllowModifyButton(true);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="col-md-5 col-10 mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setAllowModifyButton(true);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="col-md-5 col-10">
              <Form.Label>Telefonnummer</Form.Label>
              <PhoneInput
                inputClass="accountNumberInput"
                value={phoneNumber}
                forceDialCode
                className="col-md-5 col-10 mb-3"
                onChange={(phoneNumber) => {
                  setPhoneNumber(phoneNumber);
                  setAllowModifyButton(true);
                }}
              />
            </Form.Group>
            <button
              type="submit"
              className="btn btn-light account-btn"
              disabled={!allowModifyButton}
            >
              Speichern
            </button>
          </Form>
        </div>
        <div></div>
      </section>
      <Title content={"KAUFINFORMATIONEN"} />
      <section className="orders-info-cont row d-flex justify-content-evenly">
        <div className="order-info col-lg-3 col-10 text-center">
          <p className="order-info-label">Artikel auf Wunschliste</p>
          <p className="order-info-value">20+</p>
        </div>
        <div className="order-info col-lg-3 col-10 text-center">
          <p className="order-info-label">Artikel gekauft</p>
          <p className="order-info-value">15+</p>
        </div>
        <div className="order-info col-lg-3 col-10 text-center">
          <p className="order-info-label">Gesamtausgaben</p>
          <p className="order-info-value">3250€</p>
        </div>
      </section>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)}
      >
        <Modal.Body>
          <p className="text-light fw-bold fs-3">Passwort ändern</p>
          <Form
            className="row d-flex justify-content-evenly align-items-center"
            onSubmit={(e) => {
              updateUserPW(e);
            }}
          >
            <Form.Group className="col-10 mb-3">
              <Form.Label className="text-light">Altes Passwort</Form.Label>
              <InputGroup>
                <Form.Control
                  type={hidePassword ? "password" : "text"}
                  value={oldPassword}
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                    setAllowModifyPWButton(true);
                  }}
                ></Form.Control>
                <InputGroup.Text
                  className="hidePassword"
                  onClick={() => {
                    showPassword();
                  }}
                >
                  {hidePassword ? <Eye /> : <EyeSlash />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="col-10 mb-3">
              <Form.Label className="text-light">Neues Passwort</Form.Label>
              <InputGroup>
                <Form.Control
                  type={hidePassword ? "password" : "text"}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setAllowModifyPWButton(true);
                  }}
                ></Form.Control>
                <InputGroup.Text
                  className="hidePassword"
                  onClick={() => {
                    showPassword();
                  }}
                >
                  {hidePassword ? <Eye /> : <EyeSlash />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <button
              type="submit"
              className="btn btn-light account-btn"
              disabled={!allowModifyPWButton}
            >
              Speichern
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </main>
  );
}
