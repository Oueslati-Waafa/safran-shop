import express from 'express';

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: API endpoints for managing users
 */

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/User.controller.js";

/** Defining the router */
const usersRouter = express.Router();

/**
 * @swagger
 * /users/getall:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: OK
 */
usersRouter.route("/getall").get(getUsers);

/**
 * @swagger
 * /users/add:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fname:
 *                 type: string
 *               lname:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               password:
 *                 type: string
 *               isAdmin:
 *                 type: boolean
 *               shippingDetails:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Created
 */
usersRouter.route("/add").post(createUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
usersRouter.route("/:id").get(getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fname:
 *                 type: string
 *               lname:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               password:
 *                 type: string
 *               isAdmin:
 *                 type: boolean
 *               shippingDetails:
 *                 type: Schema.Types.ObjectId
 *     responses:
 *       200:
 *         description: OK
 *   delete:
 *     summary: Delete a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
usersRouter.route("/:id").put(updateUser).delete(deleteUser);

export { usersRouter };
