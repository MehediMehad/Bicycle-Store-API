import express, { Application, Request, Response } from 'express';
import config from './app/config';
import cors from 'cors';
import bicycleRouter from './app/module/bicycle/bicycle.router';
import orderRouter from './app/module/order/order.route';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use('/api/bicycle', bicycleRouter);
app.use('/api/order', orderRouter);

// applications routs
const getAController = (req: Request, res: Response) => {
    res.send(`The bicycle is moving at a speed of ${config.port} 🚴`);
};

app.get('/', getAController);

export default app;
