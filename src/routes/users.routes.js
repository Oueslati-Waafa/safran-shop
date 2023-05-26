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
  addToWishlist,
  getWishlist,
  deleteFromWishlist
} from "../controllers/User.controller.js";
import { ensureUser, ensureAdmin } from "../middlewares/auth.middleware.js";
/** Defining the router */
const usersRouter = express.Router();

/**
 * @swagger
 * /users/getall:
 *   get:
 *     summary: Retrieve a list of users
 *     tags:
 *       - Users
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
 *     tags:
 *       - Users
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
 *     responses:
 *       201:
 *         description: Created
 */
usersRouter.route("/add").post(createUser);
/**
 * @swagger
 * /users/wishlist:
 *   get:
 *     summary: Get the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 wishlist:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
usersRouter.route("/wishlist").get(ensureUser, getWishlist);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     tags:
 *       - Users
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
 *     tags:
 *       - Users
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
 *     responses:
 *       200:
 *         description: OK
 *   delete:
 *     summary: Delete a user
 *     tags:
 *       - Users
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


/**
 * @swagger
 * /users/wishlist/add/{id}:
 *   post:
 *     summary: Add a product to the wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product to add
 *     responses:
 *       200:
 *         description: Product added to wishlist successfully
 *       404:
 *         description: User or Product not found
 *       500:
 *         description: Internal Server Error
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

usersRouter.route("/wishlist/add/:id").post(ensureUser, addToWishlist);

/**
 * @swagger
 * /users/wishlist/delete/{id}:
 *   delete:
 *     summary: Delete a product from the wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product to delete
 *     responses:
 *       200:
 *         description: Product removed from wishlist successfully
 *       404:
 *         description: User or Product not found
 *       500:
 *         description: Internal Server Error
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
usersRouter.route("/wishlist/delete/:id").delete(ensureUser, deleteFromWishlist);




export { usersRouter };
