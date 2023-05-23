import express from 'express';
import { register , login , resetPassword} from '../controllers/authentication.controller.js';
import { verifyEmail , resendVerificationEmail, resetPasswordByEmail } from '../controllers/mailling.controller.js';


const authentication = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: API endpoints for user authentication
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
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
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       409:
 *         description: Email is already registered
 *       500:
 *         description: Internal Server Error
 */
authentication.post('/register', register);


/**
 * @swagger
 * /auth/verify/{email}:
 *   post:
 *     summary: Verify user's email
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[^@\s]+@[^@\s]+\.[^@\s]+$'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               verificationCode:
 *                 type: string
 *             required:
 *               - code
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid verification code
 *       500:
 *         description: Internal Server Error
 */

authentication.post('/verify/:param', verifyEmail);


/**
 * @swagger
 * /auth/resend-verification/{email}:
 *   get:
 *     summary: Resend verification email
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[^@\s]+@[^@\s]+\.[^@\s]+$'
 *     responses:
 *       200:
 *         description: Verification email sent successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
authentication.get('/resend-verification/:param', resendVerificationEmail);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid email or password
 *       403:
 *         description: Email not verified
 *       500:
 *         description: Internal Server Error
 */
authentication.post('/login', login);

/**
 * @swagger
 * /auth/reset/{email}:
 *   get:
 *     summary: Reset password email
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[^@\s]+@[^@\s]+\.[^@\s]+$'
 *     responses:
 *       200:
 *         description: New password was sent to your email
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
authentication.get('/reset/:param', resetPasswordByEmail);


/**
 * @swagger
 * /auth/reset/{email}:
 *   post:
 *     summary: Reset user's password
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[^@\s]+@[^@\s]+\.[^@\s]+$'
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid request or password mismatch
 *       500:
 *         description: Internal Server Error
 */
authentication.post('/reset/:param', resetPassword);

export { authentication };
