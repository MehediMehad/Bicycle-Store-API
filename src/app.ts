import express, { Application, Request, Response } from 'express';
import config from './app/config';
import cors from 'cors';
import bicycleRouter from './app/module/bicycle/bicycle.router';
import orderRouter from './app/module/order/order.route';
import errorMiddleware from './app/module/Middleware/Middleware';
const app: Application = express();

// Parsers: Middleware to parse incoming request bodies
app.use(express.json());
app.use(cors());

// Set up API route handlers
app.use('/api/products', bicycleRouter);
app.use('/api/orders', orderRouter);

// applications routs
const getAController = (req: Request, res: Response) => {
    res.send(`The bicycle is moving at a speed of ${config.port} 🚴`);
};

// Root route ("/") which will respond to GET requests
app.get('/', getAController);

// Error-handling middleware (should be defined to handle errors globally)
app.use(errorMiddleware);

export default app;
