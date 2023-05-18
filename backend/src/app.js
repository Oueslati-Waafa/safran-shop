import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
//const productsRouter = express.Router();
import { productsRouter } from './routes/products.routes.js';
import { usersRouter } from './routes/users.routes.js';
import { shippingDetailsRouter } from './routes/shippingdetails.routes.js';
import dotenv from 'dotenv';

/* Accessing .env content */
dotenv.config();

/* Creating express app */
const app = express();

app.use(cors({ origin: '*' }));

app.use(bodyParser.json());
/* Using routers */
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/shipping-details', shippingDetailsRouter);

export default app;