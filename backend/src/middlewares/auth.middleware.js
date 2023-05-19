import jwt from 'jsonwebtoken';
import { User } from '../models/Users.js';
import validator from 'validator';

/**ENSURE THAT USER IS LOGGED IN */

export function ensureLoggedIn(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const id = decodedToken.user.id;
        const name = decodedToken.user.name;
        const email = decodedToken.user.email;
       const role = decodedToken.user.role;
        var user = req.params.param;
        if (
            user.toString() !== name.toString() &&
            user.toString() !== email.toString() &&
            user.toString() !== id.toString() &&
            user.toString() !== role.toString()

        ) {
            return res.status(401).json({
                message: 'Invalid token',
            });
        } else {
            next();
        }
    } catch (err) {
        return res.status(500).json({
            error: new Error('Invalid request!'),
        });
    }
}