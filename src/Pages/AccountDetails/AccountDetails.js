import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap";
import { Camera, Eye, EyeSlash } from "react-bootstrap-icons";
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
  const [filePath, setFilePath] = useState(null);
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
          `https://safran.onrender.com/users/${user.id}`,
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
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFilePath(file);
  };

  const updateUserImg = async (e) => {
    e.preventDefault();

    if (!filePath) {
      // Handle error if no file is selected
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", filePath);

      const response = await axios.put(
        `https://safran.onrender.com/users/image/${user.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update the user object in local storage with the new image URL
      const updatedUser = {
        ...user,
        img: response.data.imageUrl[0],
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Update the state to trigger re-rendering
      setRefreshUser(refreshUser + 1);
      setIsImgModalOpen(false);

      // Show success message
      toast.success("Bild erfolgreich aktualisiert", {
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
      // Handle error response
      console.error(error.response.data);
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
          `https://safran.onrender.com/auth/reset/${user.id}`,
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
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const showPassword = () => {
    setHidePassword(!hidePassword);
  };

  console.log(filePath);

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
          <div className="personal-info-img-cont">
            <img
              className="img-fluid personal-info-img rounded-circle img-thumbnail"
              alt="profile image"
              src={user?.img}
            />
            <button
              className="personal-info-img-modify btn btn-link"
              onClick={() => {
                setIsImgModalOpen(true);
              }}
            >
              <Camera color="#841315" size={25} />
            </button>
          </div>
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
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={isImgModalOpen}
        onHide={() => setIsImgModalOpen(false)}
      >
        <Modal.Body>
          <p className="text-light fw-bold fs-3">Update profile image</p>
          <Form
            className="row d-flex justify-content-evenly align-items-center"
            onSubmit={(e) => {
              updateUserImg(e);
            }}
          >
            <Form.Group className="col-10 mb-3">
              <Form.Label className="text-light">
                Select a local file
              </Form.Label>
              <Form.Control
                type={"file"}
                value={filePath === null ? "" : filePath.path}
                onChange={handleFileChange}
              ></Form.Control>
            </Form.Group>
            <button
              type="submit"
              className="btn btn-light account-btn"
              disabled={filePath === ""}
            >
              Speichern
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </main>
  );
}
