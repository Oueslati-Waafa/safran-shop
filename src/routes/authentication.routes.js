import express from "express";
import {
  register,
  login,
  resetPassword,
} from "../controllers/authentication.controller.js";
import {
  verifyEmail,
  resendVerificationEmail,
  resetPasswordByEmail,
} from "../controllers/mailling.controller.js";

const authentication = express.Router();

authentication.post("/register", register);

authentication.post("/verify/:param", verifyEmail);

authentication.get("/resend-verification/:param", resendVerificationEmail);

authentication.post("/login", login);

authentication.get("/reset/:param", resetPasswordByEmail);

authentication.post("/reset/:param", resetPassword);

export { authentication };
