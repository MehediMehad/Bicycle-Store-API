import express, { Application, Request, Response } from 'express';
import config from './app/config';
import cors from 'cors';
import bicycleRouter from './app/module/bicycle/bicycle.router';
import orderRouter from './app/module/order/order.route';
import errorMiddleware from './app/module/Middleware/Middleware';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use('/api/products', bicycleRouter);
app.use('/api/orders', orderRouter);

// applications routs
const getAController = (req: Request, res: Response) => {
    res.send(`The bicycle is moving at a speed of ${config.port} 🚴`);
};

app.get('/', getAController);

app.use(errorMiddleware);

export default app;
