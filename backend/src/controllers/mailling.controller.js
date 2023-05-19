import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { findOneUserByFilter } from './authentication.controller.js';
import user from '../models/Users.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const emailTemplateSource = fs.readFileSync(
  path.join(__dirname, "../public/templates/email.hbs"),
  "utf8"
);

/**SEND VERIFICATION CODE */
export function sendVerificationEmail(user) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  var verificationCode = Math.floor(Math.random() * 9000) + 1000;
  user.verificationCode = bcrypt.hashSync(verificationCode.toString(), 10);

  const template = handlebars.compile(emailTemplateSource);
  const title = "Soleil Safran Account Verification";
  const message = `Hi there ${user.fname}, We're excited to have you get started.
 First, you need to confirm your account.`;

  const htmlToSend = template({
    title: title,
    message: message,
    code: verificationCode,
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: "Solei Safran Email Verification",
    html: htmlToSend,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
    }
    console.log(`Email sent to ${user.email} successfully`);
  });
}

/**VERIFY USER WITH CODE SENT VIA EMAIL */
export function verifyEmail(req, res) {
  const { verificationCode } = req.body;
  findOneUserByFilter(req.params.param)
     .then((foundUser) => {
        if (!foundUser) {
           return res.status(404).json({ message: 'User not found!' });
        } else {
           bcrypt
              .compare(
                 verificationCode.toString(),
                 foundUser.verificationCode
              )
              .then((valid) => {
                 if (!valid) {
                    return res.status(400).json({
                       message: 'Verification code is incorrect',
                    });
                 } else {
                    if (foundUser.isVerified) {
                       return res.status(400).json({
                          message: 'User is already verified',
                       });
                    } else {
                       user
                          .findByIdAndUpdate(foundUser._id, {
                             $set: {
                                isVerified: true,
                             },
                          })
                          .then((result) =>
                             res.status(200).json({
                                message: `${foundUser.fname} verified successfully`,
                             })
                          )
                          .catch((err) =>
                             res.status(500).json({ error: err.message })
                          );
                    }
                 }
              });
        }
     })
     .catch((err) => res.status(500).json({ error: err.message }));
}

/**RESEND THE VERIFICATION CODE VIA EMAIL */
export function resendVerificationEmail(req, res) {
  findOneUserByFilter(req.params.param)
    .then((foundUser) => {
       if (!foundUser) {
          return res.status(404).json({ message: 'user not found!' });
       } else if (foundUser.isVerified) {
          return res.status(400).json({
             message: 'user is already verified',
          });
       } else {
          sendVerificationEmail(foundUser);
          user
             .updateOne(
                { _id: foundUser._id },
                {
                   $set: {
                      verificationCode: foundUser.verificationCode,
                   },
                }
             )
             .then((result) => {
                return res.status(200).json({
                   message: `${foundUser.name} verification email resent successfully`,
                });
             })
             .catch((err) => res.status(500).json({ error: err.message }));
       }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
}

/**RESET PASSWORD BY EMAIL */
export function resetPasswordByEmail(req, res) {
   findOneUserByFilter(req.params.param)
     .then((foundUser) => {
        if (!foundUser) {
           return res.status(404).json({ message: 'User not found!' });
        } else {
           sendResetPasswordEmail(foundUser);
           user
              .updateOne(
                 { _id: foundUser._id },
                 { $set: { password: foundUser.password } }
              )
              .then((result) => {
                 res.status(200).json({
                    message: `${foundUser.fname} password reset successfully`,
                 });
              })
              .catch((err) => res.status(500).json({ error: err.message }));
        }
     })
     .catch((err) => res.status(500).json({ error: err.message }));
}

/**SEND THE GENERATED PASSWORD IN THE MAIL */
function sendResetPasswordEmail(user) {
  const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
     },
  });
  var newPassword = Math.floor(Math.random() * 900000) + 1000;
  user.password = bcrypt.hashSync(newPassword.toString(), 10);
  const template = handlebars.compile(emailTemplateSource);
  const title = 'Reset Password';
  const message = `Hi there ${user.name}, you'll find down below your new password.
  Please don't share it with anyone. We'd recommend you to change it after you login.`;

  const htmlToSend = template({
     title: title,
     message: message,
     code: newPassword,
  });
  const mailOptions = {
     from: process.env.EMAIL,
     to: user.email,
     subject: 'SOLEIL SAFRAN [Reset Password]',
     html: htmlToSend,
  };
  transporter.sendMail(mailOptions, (err, info) => {
     if (err) {
        console.log(err);
     } else {
        console.log(`Email sent to ${user.email} successfully`);
     }
  });
}
