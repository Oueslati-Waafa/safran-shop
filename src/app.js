import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import { productsRouter } from './routes/products.routes.js';
import { usersRouter } from './routes/users.routes.js';
import { authentication } from './routes/authentication.routes.js';
import { ordersRouter } from './routes/order.routes.js';
import dotenv from 'dotenv';
import { testimonialRoutes } from './routes/testimonials.routes.js';

/* Accessing .env content */
dotenv.config();

/* Creating express app */
const app = express();

app.use(cors({ origin: '*' }));

/**Configuring stripe */




app.use(bodyParser.json());
/* Using routers */
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/auth', authentication);
app.use('/orders', ordersRouter);
app.use('/testimonials', testimonialRoutes)

export default app;