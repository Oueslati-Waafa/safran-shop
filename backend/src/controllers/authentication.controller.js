
import User from '../models/Users.js'
import Validator from 'validator'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import { sendVerificationEmail } from './mailling.controller.js';


/**SIGNUP FUNCTION */

export function register(req, res) {
    if (!validationResult(req).isEmpty()) {
       res.status(400).json({ error: validationResult(req).array() });
    } else {
       User
          .findOne({})
          .or([
             { email: req.body.email },
          ])
          .then((exists) => {
             if (exists) {
                res.status(409).json({ message: 'User exists already!' });
             } else {
                const newUser = req.body;
 
                newUser.fname = newUser.fname;
                newUser.password = bcrypt.hashSync(req.body.password, 10);
               
                if(req.file){
                   newUser.img=req.file.path;
                }
                   User
                      .create(newUser)
                      .then((result) => {
                         findOneUserByFilter(result._id)
                            .then((register) => {
                               sendVerificationEmail(register);
                               User
                                  .updateOne(
                                     { email: register.email },
                                     {
                                        $set: {
                                           verificationCode:
                                              register.verificationCode,
                                        },
                                     }
                                  )
                                  .then((result) =>
                                     res.status(201).json(addTokenToUser(register))
                                  )
                                  .catch((err) =>
                                     res.status(500).json({ error: err.message })
                                  );
                            })
                            .catch((err) =>
                               res.status(500).json({ error: err.message })
                            );
                      })
                      .catch((err) => res.status(500).json({ error: err.message }));
             }
          })
          .catch((err) => res.status(500).json({ error: err.message }));
    }
 }

 /**LOGIN FUNCTION */
 export function login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
    }
 
    User
       .findOne({ email: req.body.email })
 
       .then((user) => {
          if (!user) {
             return res.status(404).json({
                message: 'user not found!',
             });
          } else {
 
 
            if(user.isVerified == false) {
             return res.status(406).json({
                message: 'user email not verified !',
             });
    }
 
             bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                   if (!valid) {
                      res.status(404).json({
                         message: 'Wrong email or password!',
                      });
                   } else {
                      User
                         .findById(user._id)
                         .then((login) =>
                            res.status(200).json(addTokenToUser(login))
                         )
                         .catch((err) =>
                            res.status(500).json({
                               error: err.message,
                            })
                         );
                   }
                })
                .catch((err) => res.status(500).json({ error: err.message }));
          }
       })
       .catch((err) => res.status(500).json({ error: err.message }));
 }
 
  /**RESET PASSWORD FUNCTION */
  export function resetPassword(req, res) {
    const { oldPassword, newPassword } = req.body;
    findOneUserByFilter(req.params.param)
       .then((foundUser) => {
          if (!foundUser) {
             return res.status(404).json({ message: 'User not found!' });
          } else {
             if (bcrypt.compareSync(oldPassword, foundUser.password)) {
                const newPasswordHash = bcrypt.hashSync(newPassword, 10);
                User
                   .updateOne(
                      { _id: foundUser._id },
                      { $set: { password: newPasswordHash } }
                   )
                   .then((result) => {
                      res.status(200).json({
                         message: `${foundUser.fname} password reset successfully`,
                      });
                   })
                   .catch((err) => res.status(500).json({ error: err.message }));
             } else {
                res.status(400).json({
                   message: `${foundUser.fname} password reset failed`,
                });
             }
          }
       })
       .catch((err) => res.status(500).json({ error: err.message }));
 }

 /**
 * A helper function that gets the user
 * with a given id or username or email
 * in the request body or as a param in the request uri
 */
export async function findOneUserByFilter(userFilter) {
    var userId = null;
    if (mongoose.Types.ObjectId.isValid(userFilter)) {
       userId = userFilter;
    }
    return await User.findOne({
       $or: [
          { _id: userId },
          { email: userFilter },
          { fname: userFilter },
          { lname: userFilter },
       ],
    });
 }

 /**A FUNCTON TO ADD TOKEN */
 function addTokenToUser(user) {
   const payload = {
     user: {
       id: user._id,
       email: user.email,
       isAdmin: user.isAdmin,
     },
   };
   const token = jwt.sign(payload, process.env.JWT_SECRET, {
     expiresIn: '24h',
   });
   const loggedUser = userFormat(user);
   loggedUser.token = token;
   return loggedUser;
 }
 

 export function userFormat(user) {
    return {
       id: user._id,
       fname: user.fname,
       lname: user.lname,
       email: user.email,
       password: user.password,
       phoneNumber: user.phoneNumber,
       isVerified: user.isVerified,
       isAdmin: user.isAdmin,
       imageUrl: user.imageUrl,
    };
 }