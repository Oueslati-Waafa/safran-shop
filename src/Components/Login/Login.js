import axios from "axios";
import React, { useState } from "react";
import { useRef } from "react";
import { FloatingLabel, Form, InputGroup } from "react-bootstrap";
import { Envelope, Key, Person, Phone } from "react-bootstrap-icons";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Log.css";

const Login = () => {
  const [logAction, setLogAction] = useState("login");
  const [logInEmail, setLogInEmail] = useState("");
  const [logInPassword, setLogInPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpFname, setSignUpFname] = useState("");
  const [signUpLname, setSignUpLname] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpPassword2, setSignUpPassword2] = useState("");
  const [signUpNumber, setSignUpNumber] = useState("");
  const [vrfCode, setVrfCode] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPW, setNewPW] = useState("");
  const [confirmNewPW, setConfirmNewPW] = useState("");
  const signUpForm = useRef();
  const logInForm = useRef();
  const [isValidRegistration, setIsValidRegistration] = useState(true);
  const [isValidLogIn, setIsValidLogIn] = useState(true);
  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    console.log("logging in");
    e.preventDefault();
    if (logInEmail === "" || logInPassword === "") {
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
    if (isValidLogIn) {
      try {
        const response = await axios.post("http://localhost:9090/auth/login", {
          email: logInEmail,
          password: logInPassword,
        });
        console.log(response);
        const userToSave = {
          fname: response.data.fname,
          lname: response.data.lname,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
          img: response.data.imageUrl[0],
          token: response.data.token,
          id: response.data.id,
        };
        localStorage.setItem("user", JSON.stringify(userToSave));
        localStorage.setItem("loggedIn", true);
        toast.success("Logged in successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/");
      } catch (error) {
        console.error(error.response.data); // error message if not successful
        toast.error("Falsche E-Mail oder Passwort!", {
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
  const handleResetPW = async (e) => {
    e.preventDefault();
    if (resetEmail === "") {
      toast.error("Bitte geben Sie Ihre E-Mail-Adresse ein!", {
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
    try {
      const response = await axios.get(
        `http://localhost:9090/auth/reset/${resetEmail}`
      );
      console.log(response);
      toast.success("Reset code sent", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setLogAction("login");
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
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      signUpEmail === "" ||
      signUpFname === "" ||
      signUpLname === "" ||
      signUpNumber === "" ||
      signUpPassword === "" ||
      signUpPassword2 === ""
    ) {
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
    if (signUpPassword !== signUpPassword2) {
      toast.error("Die Passwörter stimmen nicht überei!", {
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
    if (isValidRegistration) {
      try {
        const toSendNumber = "+" + signUpNumber;
        console.log(toSendNumber);
        const response = await axios.post(
          "http://localhost:9090/auth/register",
          {
            fname: signUpFname,
            lname: signUpLname,
            email: signUpEmail,
            phoneNumber: toSendNumber,
            password: signUpPassword,
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
          id: response.data.id,
        };
        localStorage.setItem("user", JSON.stringify(userToSave));
        toast.success("Verification code sent", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setLogAction("verify");
      } catch (error) {
        console.error(error.response.data); // error message if not successful
        toast.error("an error occurred!", {
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

  const handleCodeVerification = async (event) => {
    event.preventDefault(); // prevent from submission
    try {
      const response = await axios.post(
        `http://localhost:9090/auth/verify/${signUpEmail}`,
        {
          verificationCode: vrfCode,
        }
      );
      toast.success("Verification success", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      localStorage.setItem("loggedIn", true);
      const userString = localStorage.getItem("user");
      if (userString) {
        const user = JSON.parse(userString);
        user.isVerified = true; // Update the isVerified attribute
        const updatedString = JSON.stringify(user);
        localStorage.setItem("user", updatedString);
      }
      navigate("/");
    } catch (error) {
      toast.error("Invalid code!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log(error.response.data);
    }
  };
  const handleResendCodeVerification = async () => {
    console.log(signUpEmail);
    try {
      const response = await axios.get(
        `http://localhost:9090/auth/resend-verification/${signUpEmail}`
      );
      toast.success("Verification code resent", {
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
      toast.error("Error", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log(error.response.data);
    }
  };

  return (
    <main className="login-container d-flex flex-column align-items-center justify-content-center">
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
      {logAction === "login" ? (
        <>
          <section className="login-box mb-5 d-flex flex-column justify-content-center">
            <p className="log-title text-center display-5 fw-bold">Log in</p>
            <Form
              className="log-form mb-5"
              onSubmit={(e) => {
                handleLogIn(e);
              }}
              ref={logInForm}
            >
              <InputGroup className="mb-4">
                <InputGroup.Text id="basic-addon1">
                  <Envelope />
                </InputGroup.Text>
                <FloatingLabel
                  controlId="email"
                  label="Your email"
                  className="log-form-label"
                >
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    className="log-form-input"
                    onChange={(e) => {
                      setLogInEmail(e.target.value);
                    }}
                  />
                </FloatingLabel>
              </InputGroup>
              <InputGroup className="mb-4">
                <InputGroup.Text id="basic-addon2">
                  <Key />
                </InputGroup.Text>
                <FloatingLabel
                  controlId="password"
                  label="Your password"
                  className="log-form-label"
                >
                  <Form.Control
                    type="password"
                    placeholder="name@example.com"
                    className="log-form-input"
                    onChange={(e) => {
                      setLogInPassword(e.target.value);
                    }}
                  />
                </FloatingLabel>
              </InputGroup>
              <button type="submit" className="btn log-btn">
                Log in
              </button>
            </Form>
            <p className="log-reset-link text-center">
              <Link
                className="text-primary fw-bold"
                onClick={() => {
                  setLogAction("reset");
                }}
              >
                Forgot password ?
              </Link>
            </p>
          </section>
          <p className="log-link-cont">
            Don't have an account?{" "}
            <Link
              className="log-link"
              onClick={() => {
                setLogAction("register");
              }}
            >
              Sign Up
            </Link>
          </p>
        </>
      ) : logAction === "reset" ? (
        <>
          <section className="login-box mb-5 d-flex flex-column justify-content-center">
            <p className="log-title text-center display-5 fw-bold mb-4">
              Reset password
            </p>
            <Form
              className="log-form mb-5"
              onSubmit={(e) => {
                handleResetPW(e);
              }}
            >
              <InputGroup>
                <InputGroup.Text id="basic-addon1">
                  <Envelope />
                </InputGroup.Text>
                <FloatingLabel
                  controlId="email"
                  label="Your email"
                  className="log-form-label"
                >
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    className="log-form-input"
                    onChange={(e) => {
                      setResetEmail(e.target.value);
                    }}
                  />
                </FloatingLabel>
              </InputGroup>
              <small className="text-muted">
                We'll send you a reset code by email .
              </small>
              <button type="submit" className="btn log-btn mt-4">
                Submit
              </button>
            </Form>
          </section>
          <p className="log-link-cont">
            Don't have an account?{" "}
            <Link
              className="log-link"
              onClick={() => {
                setLogAction("register");
              }}
            >
              Sign Up
            </Link>
          </p>
        </>
      ) : logAction === "register" ? (
        <>
          <section className="login-box mb-5 d-flex flex-column justify-content-center">
            <p className="log-title text-center display-5 fw-bold">Sign up</p>
            <Form
              className="log-form mb-5"
              onSubmit={(e) => {
                handleRegister(e);
              }}
              ref={signUpForm}
            >
              <InputGroup className="mb-4">
                <InputGroup.Text id="basic-addon1">
                  <Envelope />
                </InputGroup.Text>
                <FloatingLabel
                  controlId="email"
                  label="Email"
                  className="log-form-label"
                >
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    className="log-form-input"
                    onChange={(e) => {
                      setSignUpEmail(e.target.value);
                    }}
                  />
                </FloatingLabel>
              </InputGroup>
              <div className="row">
                <InputGroup className="mb-4 col">
                  <InputGroup.Text id="basic-addon1">
                    <Person />
                  </InputGroup.Text>
                  <FloatingLabel
                    controlId="fname"
                    label="First name"
                    className="log-form-label"
                  >
                    <Form.Control
                      type="text"
                      placeholder="name@example.com"
                      className="log-form-input"
                      onChange={(e) => {
                        setSignUpFname(e.target.value);
                      }}
                    />
                  </FloatingLabel>
                </InputGroup>
                <InputGroup className="mb-4 col">
                  <InputGroup.Text id="basic-addon1">
                    <Person />
                  </InputGroup.Text>
                  <FloatingLabel
                    controlId="lname"
                    label="Last name"
                    className="log-form-label"
                  >
                    <Form.Control
                      type="text"
                      placeholder="name@example.com"
                      className="log-form-input"
                      onChange={(e) => {
                        setSignUpLname(e.target.value);
                      }}
                    />
                  </FloatingLabel>
                </InputGroup>
              </div>
              <PhoneInput
                defaultCountry="de"
                value={signUpNumber}
                onChange={(signUpNumber) => {
                  setSignUpNumber(signUpNumber);
                }}
                forceDialCode
                className="mb-4"
                inputClass="signUpNumberInput"
                country="de"
              />
              <InputGroup className="mb-4">
                <InputGroup.Text id="basic-addon2">
                  <Key />
                </InputGroup.Text>
                <FloatingLabel
                  controlId="signUpPassword"
                  label="Password"
                  className="log-form-label"
                >
                  <Form.Control
                    type="password"
                    placeholder="name@example.com"
                    className="log-form-input"
                    onChange={(e) => {
                      setSignUpPassword(e.target.value);
                    }}
                  />
                </FloatingLabel>
              </InputGroup>
              <InputGroup className="mb-4">
                <InputGroup.Text id="basic-addon2">
                  <Key />
                </InputGroup.Text>
                <FloatingLabel
                  controlId="signUpPassword2"
                  label="Repeat password"
                  className="log-form-label"
                >
                  <Form.Control
                    type="password"
                    placeholder="name@example.com"
                    className="log-form-input"
                    onChange={(e) => {
                      setSignUpPassword2(e.target.value);
                    }}
                  />
                </FloatingLabel>
              </InputGroup>
              <button type="submit" className="btn log-btn">
                Sign up
              </button>
            </Form>
          </section>
          <p className="log-link-cont">
            Already have an account?{" "}
            <Link
              className="log-link"
              onClick={() => {
                setLogAction("login");
              }}
            >
              Log in
            </Link>
          </p>
        </>
      ) : logAction === "verify" ? (
        <>
          <section className="login-box mb-5 d-flex flex-column justify-content-center">
            <p className="log-title text-center display-5 fw-bold">
              Verification
            </p>
            <Form
              className="log-form mb-5"
              onSubmit={(e) => {
                handleCodeVerification(e);
              }}
            >
              <InputGroup className="mb-4">
                <InputGroup.Text id="basic-addon1">
                  <Envelope />
                </InputGroup.Text>
                <FloatingLabel
                  controlId="vrfCode"
                  label="Verification code"
                  className="log-form-label"
                >
                  <Form.Control
                    type="text"
                    placeholder="name@example.com"
                    className="log-form-input"
                    onChange={(e) => {
                      setVrfCode(e.target.value);
                    }}
                  />
                </FloatingLabel>
              </InputGroup>
              <button type="submit" className="btn log-btn">
                Verify
              </button>
            </Form>
          </section>
          <p className="log-link-cont">
            Didn't recieve code ?{" "}
            <Link
              className="log-link"
              onClick={() => {
                handleResendCodeVerification();
              }}
            >
              Resend
            </Link>
          </p>
        </>
      ) : null}
    </main>
  );
};

export default Login;
